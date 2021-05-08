import { LocationObject } from 'expo-location';

export const UPDATE_LOCATIONS = "UPDATE_LOCATIONS";
export const UPDATE_DISTACEINKM = "UPDATE_DISTACEINKM";

export interface UpdateLocationAction {
  type: typeof UPDATE_LOCATIONS;
  value: LocationObject;
}

export interface UpdateDistanceInKmAction {
  type: typeof UPDATE_DISTACEINKM;
  value: number;
}

export type KnownAction = UpdateLocationAction | UpdateDistanceInKmAction;
