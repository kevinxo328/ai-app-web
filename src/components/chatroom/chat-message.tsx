import { Chat } from "./chatroom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = Chat;

const ChatMessage = (props: Props) => {
  const fallbackName =
    props.role[0].toUpperCase() +
    props.role[props.role.length - 1].toUpperCase();

  return (
    <div className="flex space-x-4">
      <Avatar>
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback>{fallbackName}</AvatarFallback>
      </Avatar>
      <p className="mt-2">{props.message}</p>
    </div>
  );
};
export default ChatMessage;
