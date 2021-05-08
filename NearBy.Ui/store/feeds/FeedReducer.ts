import { Action, Reducer } from "redux";
import { FeedsState, unloadedFeedsState } from "./FeedState";
import { UPDATE_FEEDS, KnownAction } from "./FeedType";
import { AppThunkAction } from "..";
import { getDistanceFeeds } from "../../service/FeedsService";

export const actionCreators = {
  updateFeedsAction: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const locationState = getState().locationState;
    if(!locationState?.currentLocation) return;

    const { latitude, longitude } = locationState?.currentLocation.coords;
    getDistanceFeeds(latitude, longitude, locationState.distanceInKm)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
          dispatch({ type: UPDATE_FEEDS, value: result.data });
        }
      })
      .catch(({ response }) => console.log(response.data));
  },
};

export const reducer: Reducer<FeedsState> = (
  state: FeedsState | undefined,
  incomingAction: Action
) => {
  const action = incomingAction as any;

  if (state === undefined) {
    return unloadedFeedsState;
  }

  switch (action.type) {
    case UPDATE_FEEDS:
      return { ...state, data: action.value };
  }
  return state;
};
