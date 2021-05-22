export interface AddFeedState {
  title: string;
  message: string;
  city: string;
  address: string;
}

export const unloadedFeedsState: AddFeedState = {
  title: "",
  message: "",
  city: "",
  address: "",
};
