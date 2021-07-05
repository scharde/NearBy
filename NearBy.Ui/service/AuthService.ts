import httpService from "./HttpService";
import { config } from "../data/config";

interface IRegisterUserProps {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface ILoginProps {
  username: string;
  password: string;
  rememberMe: boolean;
}

const login = async (data: ILoginProps) => {
  const url = `${config.Api.login}`;
  const result = await httpService.post(url, data);
  return result;
};

const registerUser = async (userData: IRegisterUserProps) => {
  const url = `${config.Api.registerUser}`;
  const result = await httpService.post(url, userData);
  return result;
};

export { registerUser, IRegisterUserProps, ILoginProps, login };
