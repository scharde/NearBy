export interface AuthState {
  authData: {
    token: string | null;
    userId: string | null;
    username: string | null;
  };
  registerUser:
    | {
        isRegistered: boolean;
        message?: string;
      }
    | undefined;
}

export const unloadedState: AuthState = {
  authData: { token: null, userId: null, username: null },
  registerUser: undefined,
};
