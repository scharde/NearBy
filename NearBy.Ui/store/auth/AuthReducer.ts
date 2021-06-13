import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import { AuthState, unloadedState } from "./AuthState";
import { IRegisterUserProps, registerUser } from "../../service/AuthService";
import {
  IAuthUserData,
  KnownAction,
  SET_AUTH_DATA_ACTION,
  USER_AUTH_SUCCESS_ACTION,
  LOGOUT,
  USER_REGISTER_ACTION,
} from "./AuthType";
import { saveData, deleteData } from "../../utiles/secureStore";
import { Localication } from "../../Localization";

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

  registerUserAction:
    (data: IRegisterUserProps): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      registerUser(data)
        .then((result) => {
          dispatch({
            type: USER_REGISTER_ACTION,
            value: {
              isRegistered: true,
              message: Localication.UserRegistredMessage,
            },
          });
        })
        .catch((error) => {
          console.log("Error in user registration", error);
          dispatch({
            type: USER_REGISTER_ACTION,
            value: {
              isRegistered: false,
              message: Localication.UserRegistredMessage_Failed,
            },
          });
        });
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
      return { ...state, authData: { token, userId, username } };
    case LOGOUT:
      return { ...unloadedState };
    case USER_REGISTER_ACTION:
      const { isRegistered, message } = action.value;
      return { ...state, registerUser: { isRegistered, message } };
  }
  return state;
};
