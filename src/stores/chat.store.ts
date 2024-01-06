import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum RoleEnum {
  ai = "ai",
  human = "human",
}

export type Message = {
  role: keyof typeof RoleEnum;
  message: string;
};

type State = {
  messages: Message[];
};

type Actions = {
  addMessage: (params: {
    message: string;
    role: keyof typeof RoleEnum;
    stream?: boolean;
  }) => void;
};

export const useChatStore = create<State & Actions>()(
  devtools((set) => ({
    messages: [],
    addMessage: (params: {
      message: string;
      role: keyof typeof RoleEnum;
      stream?: boolean;
    }) =>
      set((state) => {
        if (
          params.stream &&
          state.messages[state.messages.length - 1].role === RoleEnum.ai
        ) {
          state.messages[state.messages.length - 1].message += params.message;
          return { messages: [...state.messages] };
        }

        return {
          messages: [
            ...state.messages,
            { message: params.message, role: params.role },
          ],
        };
      }),
  }))
);
