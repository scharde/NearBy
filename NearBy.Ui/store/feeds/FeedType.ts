import { FeedModel } from './FeedState';

export const UPDATE_FEEDS = "UPDATE_FEEDS";

export interface UpdateFeedAction {
  type: typeof UPDATE_FEEDS;
  value: FeedModel [];
}

export type KnownAction = UpdateFeedAction;
