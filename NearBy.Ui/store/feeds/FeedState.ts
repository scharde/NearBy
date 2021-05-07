export interface FeedModel {
    id: number;
    title: string; 
    message: string;
    distance: number
}

export interface FeedsState{
    data : FeedModel[]
}


export const unloadedFeedsState: FeedsState = {
   data : []
  };
  