import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { AddFeedState, unloadedFeedsState } from "./AddFeedState";
import { UPDATE_INPUT, KnownAction, addFeedFieldEnum } from "./AddFeedType";
import { saveNewFeed, ISaveNewFeedModel } from '../../service/FeedsService'

export const actionCreators = {
  inputChangeAction: (actionModel: KnownAction) => ({
    type: "UPDATE_INPUT",
    value: actionModel.value,
    field: actionModel.field,
  }),

  sendNewFeeds: (): AppThunkAction<KnownAction> => (
    dispatch,
    getState
  ) => {
    const locationState = getState().locationState;
    if(!locationState?.currentLocation) return;
    const { latitude, longitude } = locationState?.currentLocation.coords;

    const addFeedState  = getState().addFeedState;
    if(addFeedState == undefined) return;
    const saveNewFeedModel : ISaveNewFeedModel ={
      title: addFeedState.title,
      message: addFeedState.message,
      city: addFeedState.city,
      address: addFeedState.address,
      location : { 
         latitude,
         longitude 
      }
    }

    saveNewFeed(saveNewFeedModel)
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data);
        }
      })
      .catch(({ response }) => console.log(response.data));
  },
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
  }
  return state;
};
