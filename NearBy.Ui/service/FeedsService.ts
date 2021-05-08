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

export const getDistanceFeeds = async (latitude : number, longitude :  number, distanceInKm : number) => {
    const apiUrl = `${config.Api.getDistanceFeed}`;
    var query = new URLSearchParams({
      latitude: latitude.toString(), 
      longitude: longitude.toString(),
      city : "Nagpur",
      distance : distanceInKm.toString()
    });
    var url = `${apiUrl}?${query.toString()}`;
    return await httpService.get(url);
};
 