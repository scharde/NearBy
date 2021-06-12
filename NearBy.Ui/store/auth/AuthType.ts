export const SET_AUTH_DATA_ACTION = "SET_AUTH_DATA_ACTION";
export const USER_AUTH_SUCCESS_ACTION = "USER_AUTH_SUCCESS_ACTION";
export const LOGOUT = "LOGOUT";

export interface IAuthDataAction {
  type: typeof SET_AUTH_DATA_ACTION;
  value: IAuthUserData;
}

interface IAuthSuccessAction {
  type: typeof USER_AUTH_SUCCESS_ACTION;
  value: IAuthUserData;
}

export interface IAuthUserData {
  token: string;
  userId: string;
  username: string;
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export type KnownAction = IAuthDataAction | IAuthSuccessAction | ILogoutAction;
