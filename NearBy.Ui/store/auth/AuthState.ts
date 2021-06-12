export interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
}

export const unloadedState: AuthState = {
  token: null,
  userId: null,
  username: null,
};
