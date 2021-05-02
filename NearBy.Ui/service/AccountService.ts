import { LoginState } from "../store/login";
import httpService from "./HttpService";
import config from "../data/config.json";

export interface AuthorizeState {
  username: String;
  id: number;
  firstName: string;
  lastName: string;
  token: string;
}

export type AuthorizeStateProp = AuthorizeState | null;

export const authenticateUser = async (loginState: LoginState | undefined) => {
  if (loginState) {
    const url = `${config.baseUrl}${config.Api.authenticate}`;
    const loginObj = { username: loginState.username, password: loginState.password };
    return await httpService.post(url, loginObj);
  }
  return { status: false, message: "Invalid Credentials." };
};

export const logoutUser = () => {
  localStorage.clear();
};

export const setUser = (userData: AuthorizeState) => {
  localStorage["user"] = JSON.stringify(userData);
  httpService.setJwt(userData.token);
};

export const setToken = () => {
  const user: AuthorizeStateProp = getUser();
  if (user) httpService.setJwt(user.token);
};

export const getUser = (): AuthorizeStateProp => {
  const user = localStorage["user"];
  if (user) {
    return JSON.parse(localStorage["user"]);
  }
  return null;
};

export default {};
