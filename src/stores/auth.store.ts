import { create } from "zustand";

type State = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope?: string;
};

type Actions = {
  setState: (params: State) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  access_token: "",
  refresh_token: "",
  expires_in: 0,
  token_type: "",
  scope: "",
  setState: (params: State) => set(params),
}));
