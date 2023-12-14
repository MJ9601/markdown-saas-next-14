export type State = {
  logged:
    | { email: string; token: string; image: string; name?: string }
    | false;
};

export type Actions = {
  setLogin: (input: State.logged) => void;
  setLogout: () => void;
};
