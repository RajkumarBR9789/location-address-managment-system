import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  // In a real app, you would use a geocoding service here
  return Promise.resolve(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
}