import { Action, Reducer } from "redux";
import { AppThunkAction } from "..";
import {
  AuthState,
  unloadedState,
  IAuthUserData,
  KnownAction,
  SET_AUTH_DATA_ACTION,
  USER_AUTH_SUCCESS_ACTION,
  LOGOUT,
  USER_REGISTER_ACTION,
} from "./AuthState";
import {
  IRegisterUserProps,
  registerUser,
  login,
  ILoginProps,
} from "../../service/AuthService";
import httpService from "../../service/HttpService";

import { saveData, deleteData } from "../../utiles/secureStore";
import { Localication } from "../../Localization";

export const actionCreators = {
  setAuthData: (data: IAuthUserData) => ({
    type: SET_AUTH_DATA_ACTION,
    value: data,
  }),

  requestLoginAction:
    (data: ILoginProps): AppThunkAction<KnownAction> =>
    (dispatch, getState) => {
      login(data)
        .then((result) => {
          console.log(result.data);
          saveDataToStorage(result.data as IAuthUserData);
          dispatch({
            type: USER_AUTH_SUCCESS_ACTION,
            value: result.data as IAuthUserData,
          } as KnownAction);
        })
        .catch((err) => {
          console.log(err);
        });
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
          console.log("User Registered", result);
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

const saveDataToStorage = (data: IAuthUserData) => {
  saveData("UserData", JSON.stringify(data));
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
      httpService.setJwt(action.value.token);
      return { ...state, authData: action.value };
    case LOGOUT:
      return { ...unloadedState };
    case USER_REGISTER_ACTION:
      const { isRegistered, message } = action.value;
      return { ...state, registerUser: { isRegistered, message } };
  }
  return state;
};
