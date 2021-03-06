export const UPDATE_INPUT = "UPDATE_INPUT";
export const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";
export const FEED_SAVED = "FEED_SAVED";

export interface IUpdateAddFeedData {
  type?: typeof UPDATE_INPUT;
  value: string;
  field: addFeedFieldEnum;
}

export interface ICheckboxUpdate {
  type?: typeof UPDATE_CHECKBOX;
  value: boolean;
  field: checkboxFieldEnum;
}

export interface IFeedSave {
  type?: typeof FEED_SAVED;
}

export enum addFeedFieldEnum {
  "title",
  "message",
  "city",
  "address",
}

export enum checkboxFieldEnum {
  "isCurrentLocation",
}

export type KnownAction = IUpdateAddFeedData | ICheckboxUpdate | IFeedSave;
