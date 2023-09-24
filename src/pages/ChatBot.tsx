import { usePostOpenAI } from "@/apis/api";
import ChatRoom, { ChatRoomState } from "@/components/chatroom/chat-room";
import { useState } from "react";

const ChatBot = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoomState>({
    chats: [],
    input: "",
  });

  const postOpenAI = usePostOpenAI({
    onSuccess: (res) => {
      const { data } = res;
      setChatRoom((pre) => ({
        chats: [...pre.chats, { role: "ai", message: data?.message }],
        input: "",
      }));
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatRoom((pre) => ({ ...pre, input: e.target.value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") return;
    setChatRoom((pre) => ({
      chats: [...pre.chats, { role: "human", message: pre.input }],
      input: "",
    }));

    postOpenAI.mutate(chatRoom.input);
  };

  return (
    <>
      <ChatRoom
        chatRoom={chatRoom}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={postOpenAI.isLoading}
      />
    </>
  );
};

export default ChatBot;