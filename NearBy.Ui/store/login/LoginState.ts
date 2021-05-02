export interface LoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const unloadedState: LoginState = {
  username: "",
  password: "",
  rememberMe: false,
};
