import httpService from "./HttpService";
import { config } from "../data/config";

interface IRegisterUserProps {
  firstname: string;
  lastname: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

const registerUser = async (userData: IRegisterUserProps) => {
  const url = `${config.Api.registerUser}`;
  await httpService.post(url, userData);
};

export { registerUser, IRegisterUserProps };
