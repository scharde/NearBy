import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { LocationState, unloadedLocationModel } from "./LocationState";
import {
  KnownAction,
  UPDATE_DISTACEINKM,
  UPDATE_LOCATIONS,
} from "./LocationType";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export const actionCreators = {
  resetLocation: () => ({
    type: UPDATE_LOCATIONS,
    value: [],
  }),

  updateDistanceInKmAction: (value: number) => ({
    type: UPDATE_DISTACEINKM,
    value: value,
  }),

  updateLocationAction: (): AppThunkAction<KnownAction> => async (
    dispatch,
    getState
  ) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location: LocationObject = await Location.getCurrentPositionAsync({});
    dispatch({ type: UPDATE_LOCATIONS, value: location });
    console.log(location);
  },
};

export const reducer: Reducer<LocationState> = (
  state: LocationState | undefined,
  incomingAction: Action
) => {
  const action = incomingAction as any;

  if (state === undefined) {
    return unloadedLocationModel;
  }

  switch (action.type) {
    case UPDATE_LOCATIONS:
      return { ...state, currentLocation: action.value };
    case UPDATE_DISTACEINKM:
      return { ...state, distanceInKm: action.value };
  }
  return state;
};
