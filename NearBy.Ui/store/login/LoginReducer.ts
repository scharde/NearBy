import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { authenticateUser, setUser } from "../../service/AccountService";
import { LoginState, unloadedState } from "./LoginState";
import { USERNAME_ACTION, PASSWORD_ACTION, REMEMBER_ME_CHECK, RESET_LOGIC_FORM, KnownAction } from "./LoginType";
import { push } from "connected-react-router";
import { CallHistoryMethodAction } from "connected-react-router";

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

  requestLoginAction: (): AppThunkAction<CallHistoryMethodAction> => (dispatch, getState) => {
    const { loginState } = getState();
    authenticateUser(loginState)
      .then((result) => {
        if (result.status === 200) {
          setUser(result.data);
          dispatch(push("/"));
        }
      })
      .catch(({ response }) => console.log(response.data));
  },
};

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action) => {
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
