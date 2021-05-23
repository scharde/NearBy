import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { AddFeedState, unloadedFeedsState } from "./AddFeedState";
import * as Location from "expo-location";
import {
  UPDATE_INPUT,
  UPDATE_CHECKBOX,
  FEED_SAVED,
  KnownAction,
  addFeedFieldEnum,
  checkboxFieldEnum,
  IUpdateAddFeedData,
  ICheckboxUpdate,
} from "./AddFeedType";
import { saveNewFeed, ISaveNewFeedModel } from "../../service/FeedsService";

export const actionCreators = {
  inputChangeAction: (actionModel: IUpdateAddFeedData) => ({
    type: UPDATE_INPUT,
    field: actionModel.field,
    value: actionModel.value,
  }),

  checkboxUpdateAction: (actionModel: ICheckboxUpdate) => ({
    type: UPDATE_CHECKBOX,
    field: actionModel.field,
    value: actionModel.value,
  }),

  sendNewFeeds: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const addFeedState = getState().addFeedState;
    if (addFeedState === undefined) {
      return;
    }
    if (addFeedState.isCurrentLocation) {
      const locationState = getState().locationState;
      if (!locationState?.currentLocation) return;
      const { latitude, longitude } = locationState?.currentLocation.coords;
      _saveNewFeeds(dispatch, addFeedState, { latitude, longitude });
    } else {
      _getReversLocation(addFeedState.address).then((geolocation) => {
        const { latitude, longitude } = geolocation[0];
        _saveNewFeeds(dispatch, addFeedState, { latitude, longitude });
      });
    }
  },
};

const _getReversLocation = async (address: string) => {
  const geoLocation: any = await Location.geocodeAsync(address);
  return geoLocation;
};

const _saveNewFeeds = async (
  dispatch : any,
  addFeedState: AddFeedState,
  location: { latitude: number; longitude: number }
) => {
  const saveNewFeedModel: ISaveNewFeedModel = {
    title: addFeedState.title,
    message: addFeedState.message,
    city: addFeedState.city,
    address: addFeedState.address,
    location,
  };
  saveNewFeed(saveNewFeedModel)
    .then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        dispatch({ type: FEED_SAVED});
      }
    })
    .catch(({ response }) => console.log(response.data));
};

export const reducer: Reducer<AddFeedState> = (
  state: AddFeedState | undefined,
  incomingAction: Action
) => {
  const action = incomingAction as KnownAction;

  if (state === undefined) {
    return unloadedFeedsState;
  }

  switch (action.type) {
    case UPDATE_INPUT:
      const fieldName = addFeedFieldEnum[action.field];
      return { ...state, [fieldName]: action.value };
    case UPDATE_CHECKBOX:
      const chechboxFieldName = checkboxFieldEnum[action.field];
      return { ...state, [chechboxFieldName]: action.value };
    case FEED_SAVED:
        return {...unloadedFeedsState, isFeedSaved: true }
  }
  return state;
};
