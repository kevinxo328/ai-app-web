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
        chats: [...pre.chats, { role: "ai", message: data?.content }],
        input: "",
      }));
    },
    onError: (err) => {
      setChatRoom((pre) => ({
        chats: [
          ...pre.chats,
          {
            role: "ai",
            message: err?.response?.data?.detail || "系統錯誤，請聯絡管理員",
          },
        ],
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
