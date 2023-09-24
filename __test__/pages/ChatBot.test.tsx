import { render, screen } from "@testing-library/react";
import ChatBot from "@/pages/ChatBot";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/reactQuery";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany

describe("ChatBot", () => {
  it("renders input", async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ChatBot />
        </QueryClientProvider>
      </MemoryRouter>
    );
    const input = await screen.findByPlaceholderText("輸入文字");
    expect(input).toBeInTheDocument();
  });
});
