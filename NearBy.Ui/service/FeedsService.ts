import httpService from "./HttpService";
import { config } from "../data/config";

interface IAuthorizeState {
  username: String;
  id: number;
  firstName: string;
  lastName: string;
  token: string;
}

interface ISaveNewFeedModel {
  title: string;
  message: string;
  city:string,
  address: string,
  location: {
    latitude: number,
    longitude: number
  }
}

type AuthorizeStateProp = IAuthorizeState | null;

const getDistanceFeeds = async (latitude : number, longitude :  number, distanceInKm : number) => {
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

const saveNewFeed = async (data: ISaveNewFeedModel) => {
  const apiUrl = `${config.Api.getDistanceFeed}`;
  return await httpService.post(apiUrl, data);
}

export {
  IAuthorizeState,
  ISaveNewFeedModel,
  AuthorizeStateProp,
  getDistanceFeeds,
  saveNewFeed
}