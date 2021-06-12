import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { AuthState, unloadedState } from "./AuthState";
import {
  IAuthDataAction,
  IAuthUserData,
  KnownAction,
  SET_AUTH_DATA_ACTION,
  USER_AUTH_SUCCESS_ACTION,
  LOGOUT,
} from "./AuthType";
import { saveData, deleteData } from "../../utiles/secureStore";

export const actionCreators = {
  setAuthData: (data: IAuthUserData) => ({
    type: SET_AUTH_DATA_ACTION,
    value: data,
  }),

  requestLoginAction:
    (value: {
      username: string;
      password: string;
    }): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      if (
        (value.username == "admin@admin.com", value.password == "admin@123")
      ) {
        const token: string = "sagarcharde";
        dispatch({
          type: USER_AUTH_SUCCESS_ACTION,
          value: {
            username: value.username,
            token,
            userId: "1",
          },
        } as KnownAction);
        saveDataToStorage(token, value.username, "1");
      } else {
        dispatch({ type: "USER_AUTH_FAILED_ACTION" } as any);
      }
    },

  requestLogoutAction:
    (): AppThunkAction<KnownAction> => (dispatch, getState) => {
      deleteData("UserData");
      dispatch({ type: LOGOUT });
      console.log("Logout done");
    },
};

const saveDataToStorage = (token: string, userId: string, username: string) => {
  saveData(
    "UserData",
    JSON.stringify({
      token: token,
      userId: userId,
      username: username,
    })
  );
};

export const reducer: Reducer<AuthState> = (
  state: AuthState | undefined,
  incomingAction: Action
) => {
  const action = incomingAction as any;

  if (state === undefined) {
    return unloadedState;
  }

  switch (action.type) {
    case USER_AUTH_SUCCESS_ACTION:
    case SET_AUTH_DATA_ACTION:
      const { token, userId, username } = action.value;
      return { token, userId, username };
    case LOGOUT:
      return { ...unloadedState };
  }
  return state;
};
