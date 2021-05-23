export interface AddFeedState {
  title: string;
  message: string;
  city: string;
  address: string;
  isCurrentLocation: boolean,
  isFeedSaved: boolean
}

export const unloadedFeedsState: AddFeedState = {
  title: "",
  message: "",
  city: "",
  address: "",
  isCurrentLocation: false,
  isFeedSaved: false
};
