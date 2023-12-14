import { create } from "zustand";
import { Actions, State } from "./context";

const useAuth = create<State & Actions>((set) => ({
  logged: false,
  setLogin: (input) => set((state) => ({ logged: input })),
  setLogout: () => set((state) => ({ logged: false })),
}));

export default useAuth;
