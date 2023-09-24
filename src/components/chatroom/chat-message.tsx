import { Chat } from "./chatroom";

type Props = Chat;

const ChatMessage = (props: Props) => {
  return (
    <>
      <p>{props.role}</p>
      <p>{props.message}</p>
    </>
  );
};
export default ChatMessage;
