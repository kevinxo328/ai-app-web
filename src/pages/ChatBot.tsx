import { usePostChatCompletion } from "@/services/openai";
import { useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getApiUrl } from "@/libs/apiClient";
import { Switch } from "@/components/ui/switch";
import { RoleEnum, useChatStore } from "@/stores/chat.store";
import ChatRoom from "@/components/chatroom/chat-room";
import { ChatCompletionConfig } from "@/types/openai";
import { useNavigate } from "react-router-dom";

const defaultSysPrompt =
  "You are an AI assistant that helps people find information.";

const ChatBot = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [llmParams, setLLMParams] = useState<
    Omit<ChatCompletionConfig, "user_prompt">
  >({
    temperature: 0,
    sys_prompt: defaultSysPrompt,
    stream: false,
  });
  const addMessage = useChatStore((state) => state.addMessage);

  const isComposition = useRef(false);

  const postChatCompletion = usePostChatCompletion({
    onSuccess: (res) => {
      addMessage({
        role: RoleEnum.ai,
        message: res?.choices?.[0]?.message?.content,
      });

      setInput("");
    },
    onError: (err) => {
      //  TODO: need to handle 401 error globally
      if (err.response?.status === 401) {
        navigate("/", { replace: true, state: { from: "/chatbot" } });
      }

      addMessage({
        role: RoleEnum.ai,
        message: err?.response?.data?.detail || "系統錯誤，請聯絡管理員",
      });
      setInput("");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter" || isComposition.current) return;

    addMessage({ role: RoleEnum.human, message: input });

    const data = {
      user_prompt: input.trim(),
      ...llmParams,
    };

    setInput("");

    if (llmParams.stream) {
      setIsStreaming(true);
      return fetchEventSource(getApiUrl(`/openai/chat_completion`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        async onmessage(msg) {
          addMessage({
            role: RoleEnum.ai,
            message: msg?.data,
            stream: true,
          });
          setInput("");
        },
        async onclose() {
          setIsStreaming(false);
        },
      });
    }

    postChatCompletion.query.mutate({ ...data });
  };

  return (
    <div className="flex">
      <div className="p-4 w-full">
        <ChatRoom
          input={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onComposition={(e) =>
            (isComposition.current = e.type !== "compositionend")
          }
          disabled={postChatCompletion.query.isPending || isStreaming}
        />
      </div>
      <div className="border-l w-[400px] max-h-screen overflow-auto">
        <div className="p-4">
          <div className="mb-8 flex items-center">
            <Label htmlFor="stream" className="mr-2">
              Stream
            </Label>
            <Switch
              id="stream"
              checked={llmParams.stream}
              onCheckedChange={(e) =>
                setLLMParams((pre) => ({ ...pre, stream: e }))
              }
              disabled
            />
          </div>
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
              defaultValue={[llmParams.temperature as number]}
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
