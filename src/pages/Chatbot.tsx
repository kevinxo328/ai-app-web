import Chatroom, { ChatroomState } from "@/components/chatroom/chatroom";
import { useState } from "react";

const Chatbot = () => {
  const [chatroom, setChatroom] = useState<ChatroomState>({
    chats: [],
    input: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatroom((pre) => ({ ...pre, input: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") return;
    setChatroom((pre) => ({
      chats: [...pre.chats, { role: "human", message: pre.input }],
      input: "",
    }));
  };

  return (
    <>
      <Chatroom
        chatroom={chatroom}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

export default Chatbot;
