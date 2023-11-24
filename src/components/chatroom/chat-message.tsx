import { Chat, RoleEnum } from "./chat-room";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Avatar } from "../ui/avatar";

type Props = Chat;

const ChatMessage = (props: Props) => {
  return (
    <div className="flex space-x-4">
      <Avatar className="justify-center items-center">
        {props.role === RoleEnum.ai ? <RiRobot2Fill /> : <FaUser />}
      </Avatar>
      <p className="mt-2">{props.message}</p>
    </div>
  );
};
export default ChatMessage;
