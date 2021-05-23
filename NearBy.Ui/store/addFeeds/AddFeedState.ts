export interface AddFeedState {
  title: string;
  message: string;
  city: string;
  address: string;
  isCurrentLocation: boolean
}

export const unloadedFeedsState: AddFeedState = {
  title: "",
  message: "",
  city: "",
  address: "",
  isCurrentLocation: false
};
