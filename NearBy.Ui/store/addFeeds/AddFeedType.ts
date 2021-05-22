export const UPDATE_INPUT = "UPDATE_INPUT";

export interface UpdateAddFeedData {
  type?: typeof UPDATE_INPUT;
  value: string;
  field: addFeedFieldEnum
}

export enum addFeedFieldEnum {
  "title", "message", "city", "address"
}

export type KnownAction = UpdateAddFeedData;
