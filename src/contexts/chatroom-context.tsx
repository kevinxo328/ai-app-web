import { createContext, useContext, useState } from "react";

type Role = "ai" | "human";

type Chat = {
  role: Role;
  message: string;
};

type Chatroom = {
  chats: Chat[];
  input: string;
};

type ChatroomContextState = {
  chatroom: Chatroom;
  setChatroom: React.Dispatch<React.SetStateAction<Chatroom>>;
};

const initContext: ChatroomContextState = {
  chatroom: {
    chats: [],
    input: "",
  },
  setChatroom: () => {},
};

const ChatroomContext = createContext<ChatroomContextState>(initContext);

type Props = {
  children: JSX.Element;
  chatRoom: Chatroom;
};

const ChatroomProvider = (props: Props) => {
  const [chatroom, setChatroom] = useState<Chatroom>(props.chatRoom);
  const value = { chatroom, setChatroom };

  return (
    <ChatroomContext.Provider value={value}>
      {props.children}
    </ChatroomContext.Provider>
  );
};

const useChatroom = () => {
  const context = useContext(ChatroomContext);

  if (context === undefined)
    throw new Error("useChatroom must be used within a ChatroomProvider");

  return context;
};

export { ChatroomContext, ChatroomProvider, useChatroom };
