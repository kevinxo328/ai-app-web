import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Token } from "@/types/auth";

type State = Token & {
  username?: string;
  expires_at?: number;
};

type Actions = {
  setState: (params: State) => void;
};

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        access_token: "",
        refresh_token: "",
        expires_in: 0,
        token_type: "",
        scope: "",
        setState: (params: State) => {
          const decocded = jwtDecode<JwtPayload>(params.access_token);
          set({
            ...params,
            username: decocded["sub"],
            expires_at: decocded["exp"],
          });
        },
      }),
      {
        name: "auth-store",
      }
    )
  )
);
