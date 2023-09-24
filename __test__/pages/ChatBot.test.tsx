import { render, screen } from "@testing-library/react";
import ChatBot from "@/pages/ChatBot";
import { MemoryRouter } from "react-router-dom";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany
describe("Chatbot", () => {
  it("renders headline", () => {
    render(
      <MemoryRouter>
        <ChatBot />
      </MemoryRouter>
    );
    const headline = screen.getByText(/Chatbot/i);
    expect(headline).toBeInTheDocument();
  });
});
