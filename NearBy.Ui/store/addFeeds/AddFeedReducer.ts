import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { AddFeedState, unloadedFeedsState,  } from "./AddFeedState";
import {
  UPDATE_INPUT,
  UPDATE_CHECKBOX,
  KnownAction,
  addFeedFieldEnum,
  checkboxFieldEnum,
  IUpdateAddFeedData,
  ICheckboxUpdate
} from "./AddFeedType";
import { saveNewFeed, ISaveNewFeedModel } from "../../service/FeedsService";

export const actionCreators = {
  inputChangeAction: (actionModel: IUpdateAddFeedData) => ({
    type: UPDATE_INPUT,
    field: actionModel.field,
    value: actionModel.value
  }),

  checkboxUpdateAction: (actionModel: ICheckboxUpdate) => ({
    type: UPDATE_CHECKBOX,
    field: actionModel.field,
    value: actionModel.value
  }),

  sendNewFeeds: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    const locationState = getState().locationState;
    if (!locationState?.currentLocation) return;
    const { latitude, longitude } = locationState?.currentLocation.coords;

    const addFeedState = getState().addFeedState;
    if (addFeedState == undefined) return;
    const saveNewFeedModel: ISaveNewFeedModel = {
      title: addFeedState.title,
      message: addFeedState.message,
      city: addFeedState.city,
      address: addFeedState.address,
      location: {
        latitude,
        longitude,
      },
    };

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
    case UPDATE_CHECKBOX:
      const chechboxFieldName = checkboxFieldEnum[action.field];
      return { ...state, [chechboxFieldName]: action.value };
  }
  return state;
};
