import httpService from "./HttpService";
import { config } from "../data/config";

export interface AuthorizeState {
  username: String;
  id: number;
  firstName: string;
  lastName: string;
  token: string;
}

export type AuthorizeStateProp = AuthorizeState | null;

export const getDistanceFeeds = async () => {
    const apiUrl = `${config.Api.getDistanceFeed}`;
    var query = new URLSearchParams({
      latitude : "21.1188015", 
      longitude : "79.11757",
      city : "Nagpur",
      distance : "5"
    });
    var url = `${apiUrl}?${query.toString()}`;
    return await httpService.get(url);
};
