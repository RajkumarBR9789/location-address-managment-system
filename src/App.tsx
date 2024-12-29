import React, { useState, useEffect } from 'react';
import { LocationPermissionModal } from './components/LocationPermissionModal';
import { Map } from './components/Map';
import { AddressForm } from './components/AddressForm';
import { SavedAddresses } from './components/SavedAddresses';
import { useLocationStore } from './store/useLocationStore';
import { getAddressFromCoords } from './lib/utils';
import { MapPin } from 'lucide-react';
import { Toast } from './components/ui/Toast';

function App() {
  const [showPermissionModal, setShowPermissionModal] = useState(true);
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { currentLocation, setCurrentLocation, addSavedLocation } = useLocationStore();

  const handleEnableLocation = async () => {
    setIsLoading(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude: lat, longitude: lng } = position.coords;
      const address = await getAddressFromCoords(lat, lng);
      
      setCurrentLocation({ lat, lng, address });
      setShowPermissionModal(false);
    } catch (error) {
      console.error('Error getting location:', error);
      setToast({ message: 'Failed to get location. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationChange = async (lat: number, lng: number) => {
    const address = await getAddressFromCoords(lat, lng);
    setCurrentLocation({ lat, lng, address });
  };

  const handleSaveAddress = (location: Location) => {
    try {
      addSavedLocation(location);
      setToast({ message: 'Address saved successfully!', type: 'success' });
      setShowSavedAddresses(true);
    } catch (error) {
      setToast({ message: 'Failed to save address. Please try again.', type: 'error' });
    }
  };

  if (showPermissionModal) {
    return (
      <LocationPermissionModal
        onEnableLocation={handleEnableLocation}
        onSearchManually={() => setShowPermissionModal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {showSavedAddresses ? (
            <SavedAddresses onBack={() => setShowSavedAddresses(false)} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-red-600" />
                  <h1 className="text-2xl font-semibold">Set Your Location</h1>
                </div>
                <button
                  onClick={() => setShowSavedAddresses(true)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  View Saved Addresses
                </button>
              </div>

              {currentLocation && (
                <>
                  <Map
                    center={[currentLocation.lat, currentLocation.lng]}
                    onLocationChange={handleLocationChange}
                  />
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h2 className="font-medium mb-2">Selected Location</h2>
                    <p className="text-gray-600">{currentLocation.address}</p>
                  </div>
                  <AddressForm
                    initialLocation={currentLocation}
                    onSave={handleSaveAddress}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;