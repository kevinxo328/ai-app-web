import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import ChatMessage from "./chat-message";

export type Role = "ai" | "human";

export type Chat = {
  role: Role;
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
  disabled?: boolean;
};

const ChatRoom = (props: Props) => {
  const containerStyle = "max-w-[1300px] w-full";
  return (
    <div className="w-full max-h-screen h-screen overflow-auto flex flex-col items-center space-y-8 py-8">
      <ScrollArea className="w-full flex-grow-1 h-full">
        {props.chatRoom.chats.map((chat, index) => (
          <div
            key={chat.message + index}
            className={`${containerStyle} mx-auto mb-4`}
          >
            <ChatMessage role={chat.role} message={chat.message} />
          </div>
        ))}
      </ScrollArea>
      <div className={`${containerStyle}`}>
        <Input
          value={props.chatRoom.input}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          disabled={props.disabled}
          placeholder="輸入文字"
        />
      </div>
    </div>
  );
};

export default ChatRoom;
