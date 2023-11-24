import { usePostChatCompletion } from "@/apis/api";
import ChatRoom, { ChatRoomState } from "@/components/chatroom/chat-room";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const defaultSysPrompt =
  "You are an AI assistant that helps people find information.";

const ChatBot = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoomState>({
    chats: [],
    input: "",
  });

  const [llmParams, setLLMParams] = useState({
    temperature: 0,
    sys_prompt: defaultSysPrompt,
  });

  const postChatCompletion = usePostChatCompletion({
    onSuccess: (res) => {
      const { data } = res;
      setChatRoom((pre) => ({
        chats: [
          ...pre.chats,
          { role: "ai", message: data?.choices?.[0]?.message?.content },
        ],
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

    postChatCompletion.mutate({
      user_prompt: chatRoom.input.trim(),
      temperature: llmParams.temperature,
      system_prompt: llmParams.sys_prompt.trim(),
    });
  };

  return (
    <div className="flex">
      <div className="p-4 w-full">
        <ChatRoom
          chatRoom={chatRoom}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={postChatCompletion.isLoading}
        />
      </div>
      <div className="border w-[400px] max-h-screen overflow-hidden">
        <div className="p-4">
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                value={llmParams.temperature}
                className="w-[50px] h-[24px]"
                disabled
              />
            </div>
            <Slider
              id="temperature"
              defaultValue={[llmParams.temperature]}
              step={0.1}
              max={1}
              onValueChange={(e) =>
                setLLMParams((pre) => ({ ...pre, temperature: e[0] }))
              }
              aria-label="temperature"
            />
          </div>
          <div className="mb-8">
            <Label htmlFor="sys_prompt" className="mb-3">
              System Prompt
            </Label>
            <Textarea
              id="sys_prompt"
              value={llmParams.sys_prompt}
              onChange={(e) =>
                setLLMParams((pre) => ({ ...pre, sys_prompt: e.target.value }))
              }
              rows={8}
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
