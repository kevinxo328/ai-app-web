import { render, screen } from "@testing-library/react";
import ChatMessage from "@/components/chatroom/chat-message";
import { Chat } from "@/components/chatroom/chat-room";

const props: Chat = {
  role: "ai",
  message: "TestMessage",
};

describe("ChatMessage", () => {
  it("render role", () => {
    render(<ChatMessage role={props.role} message={props.message} />);

    const role = screen.getByText(props.role.toUpperCase());
    expect(role).toBeInTheDocument();
  });

  it("render message", () => {
    render(<ChatMessage role={props.role} message={props.message} />);

    const message = screen.getByText(props.message);
    expect(message).toBeInTheDocument();
  });
});
