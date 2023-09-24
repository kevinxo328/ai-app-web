import { usePostOpenAI } from "@/apis/api";
import Chatroom, { ChatroomState } from "@/components/chatroom/chatroom";
import { useState } from "react";

const Chatbot = () => {
  const [chatroom, setChatroom] = useState<ChatroomState>({
    chats: [],
    input: "",
  });

  const postOpenAI = usePostOpenAI({
    onSuccess: (res) => {
      const { data } = res;
      setChatroom((pre) => ({
        chats: [...pre.chats, { role: "ai", message: data?.message }],
        input: "",
      }));
    },
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

    postOpenAI.mutate(chatroom.input);
  };

  return (
    <>
      <Chatroom
        chatroom={chatroom}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={postOpenAI.isLoading}
      />
    </>
  );
};

export default Chatbot;
