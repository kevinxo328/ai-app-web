import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import ChatMessage from "./chat-message";

export enum RoleEnum {
  ai = "ai",
  human = "human",
}

export type Chat = {
  role: keyof typeof RoleEnum;
  message: string;
};

export type ChatRoomState = {
  chats: Chat[];
  input: string;
};

type Props = {
  chatRoom: ChatRoomState;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onComposition?: React.CompositionEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

const ChatRoom = (props: Props) => {
  const containerStyle = "max-w-[1300px]";
  return (
    <div className="w-full max-h-screen h-screen overflow-auto flex flex-col items-center space-y-8 py-8">
      <ScrollArea className="w-full flex-grow-1 h-full">
        {props.chatRoom.chats.map((chat, index) => (
          <div
            key={chat.message + index}
            className={`${containerStyle} w-full mx-auto mb-4`}
          >
            <ChatMessage role={chat.role} message={chat.message} />
          </div>
        ))}
      </ScrollArea>
      <div className={`${containerStyle} w-[calc(100%_-_12px)]`}>
        <Input
          value={props.chatRoom.input}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          onCompositionStart={props.onComposition}
          onCompositionUpdate={props.onComposition}
          onCompositionEnd={props.onComposition}
          disabled={props.disabled}
          placeholder="輸入文字"
          aria-label="message input"
        />
      </div>
    </div>
  );
};

export default ChatRoom;
