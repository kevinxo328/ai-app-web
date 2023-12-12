import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Avatar } from "../ui/avatar";
import Markdown from "markdown-to-jsx";
import { Message, RoleEnum } from "@/stores/chat.store";

type Props = Message;

const ChatMessage = (props: Props) => {
  return (
    <div className="flex space-x-4">
      <Avatar className="justify-center items-center">
        {props.role === RoleEnum.ai ? <RiRobot2Fill /> : <FaUser />}
      </Avatar>
      <div className="mt-2">
        {/* style markdown */}
        <Markdown>{props.message}</Markdown>
      </div>
    </div>
  );
};
export default ChatMessage;
