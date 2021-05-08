import { LocationObject } from "expo-location";

export interface LocationState {
    currentLocation: LocationObject | null;
    distanceInKm: number
}

export const unloadedLocationModel: LocationState = {
    currentLocation: null,
    distanceInKm:10
  };
  