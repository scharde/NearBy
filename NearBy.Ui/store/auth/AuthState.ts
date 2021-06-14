export interface AuthState {
  authData: IAuthUserData;
  registerUser:
    | {
        isRegistered: boolean;
        message?: string;
      }
    | undefined;
}

interface UserModel {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  userName: string;
}

export const unloadedState: AuthState = {
  authData: { token: null, expiryDate: null, userModel: null },
  registerUser: undefined,
};

export const SET_AUTH_DATA_ACTION = "SET_AUTH_DATA_ACTION";
export const USER_AUTH_SUCCESS_ACTION = "USER_AUTH_SUCCESS_ACTION";
export const LOGOUT = "LOGOUT";
export const USER_REGISTER_ACTION = "USER_REGISTER_ACTION";

export interface IAuthDataAction {
  type: typeof SET_AUTH_DATA_ACTION;
  value: IAuthUserData;
}

interface IAuthSuccessAction {
  type: typeof USER_AUTH_SUCCESS_ACTION;
  value: IAuthUserData;
}

export interface IAuthUserData {
  token: string | null;
  expiryDate: Date | null;
  userModel: UserModel | null;
}

export interface ILogoutAction {
  type: typeof LOGOUT;
}

export interface IUserRegisterAction {
  type: typeof USER_REGISTER_ACTION;
  value: { isRegistered: boolean; message?: string };
}

export type KnownAction =
  | IAuthDataAction
  | IAuthSuccessAction
  | ILogoutAction
  | IUserRegisterAction;
