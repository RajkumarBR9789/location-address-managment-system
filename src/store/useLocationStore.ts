import { create } from 'zustand';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  type?: 'home' | 'office' | 'other';
  details?: {
    flatNumber?: string;
    landmark?: string;
  };
}

interface LocationState {
  currentLocation: Location | null;
  savedLocations: Location[];
  setCurrentLocation: (location: Location) => void;
  addSavedLocation: (location: Location) => void;
  removeSavedLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  savedLocations: [],
  setCurrentLocation: (location) => set({ currentLocation: location }),
  addSavedLocation: (location) =>
    set((state) => ({
      savedLocations: [...state.savedLocations, location],
    })),
  removeSavedLocation: (location) =>
    set((state) => ({
      savedLocations: state.savedLocations.filter(
        (l) => l.lat !== location.lat || l.lng !== location.lng
      ),
    })),
}));