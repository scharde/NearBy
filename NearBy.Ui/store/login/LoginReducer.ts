import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { LoginState, unloadedState } from "./LoginState";
import {
  USERNAME_ACTION,
  PASSWORD_ACTION,
  REMEMBER_ME_CHECK,
  RESET_LOGIC_FORM,
  KnownAction,
} from "./LoginType";

export const actionCreators = {
  resetLoginAction: () => ({
    type: RESET_LOGIC_FORM,
  }),

  inputChangeAction: (actionModel: KnownAction) => ({
    type: actionModel.type,
    value: actionModel.value,
  }),

  rememberMeCheckAction: (value: boolean) =>
    ({
      type: REMEMBER_ME_CHECK,
      value,
    } as KnownAction),

  requestLoginAction:
    (value: {
      username: string;
      password: string;
    }): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      const { loginState } = getState();
      if (
        (value.username == "admin@admin.com", value.password == "admin@123")
      ) {
        dispatch({
          type: "USER_AUTH_SUCCESS_ACTION",
          value: {
            username: value.username,
            token: "sagarcharde",
            userId: "1",
          },
        } as any);
      } else {
        dispatch({ type: "USER_AUTH_FAILED_ACTION" } as any);
      }
    },
};

export const reducer: Reducer<LoginState> = (
  state: LoginState | undefined,
  incomingAction: Action
) => {
  const action = incomingAction as any;

  if (state === undefined) {
    return unloadedState;
  }

  switch (action.type) {
    case USERNAME_ACTION:
      return { ...state, username: action.value };
    case PASSWORD_ACTION:
      return { ...state, password: action.value };
    case REMEMBER_ME_CHECK:
      return { ...state, rememberMeChecked: action.value };
    case RESET_LOGIC_FORM:
      return unloadedState;
  }
  return state;
};
