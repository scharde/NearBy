import { LoginState, reducer as loginReducer } from "./login";
import { FeedsState, reducer as feedsReducer } from "./feeds";
import { LocationState, reducer as locationReducer } from "./location";

// The top-level state object
export interface ApplicationState {
  loginState: LoginState | undefined; 
  feedsState: FeedsState | undefined;
  locationState: LocationState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  loginState: loginReducer, 
  feedsState: feedsReducer,
  locationState: locationReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
