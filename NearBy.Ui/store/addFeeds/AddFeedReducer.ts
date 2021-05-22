import { Action, Reducer } from "redux";
import { AddFeedState, unloadedFeedsState } from "./AddFeedState";
import { UPDATE_INPUT, KnownAction, addFeedFieldEnum } from "./AddFeedType";

export const actionCreators = {
  inputChangeAction: (actionModel: KnownAction) => ({
    type: "UPDATE_INPUT",
    value: actionModel.value,
    field: actionModel.field,
  }),
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
