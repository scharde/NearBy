export const RECEIVE_LOGIN_ACTION = "RECEIVE_LOGIN_ACTION";
export const USERNAME_ACTION = "USERNAME_ACTION";
export const PASSWORD_ACTION = "PASSWORD_ACTION";
export const REMEMBER_ME_CHECK = "REMEMBER_ME_CHECK";
export const RESET_LOGIC_FORM = "RESET_LOGIC_FORM";

interface InputFieldAction {
  type: typeof USERNAME_ACTION & typeof PASSWORD_ACTION;
  value: string;
}

interface RememberMeAction {
  type: typeof REMEMBER_ME_CHECK;
  value: boolean;
}

interface ResetLoginFormAction {
  type: typeof RESET_LOGIC_FORM;
  value: string;
}

export type KnownAction = InputFieldAction | RememberMeAction | ResetLoginFormAction;
