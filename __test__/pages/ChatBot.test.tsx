import { render, screen } from "@testing-library/react";
import ChatBot from "@/pages/ChatBot";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/reactQuery";
import { userEvent } from "@testing-library/user-event";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany

describe("ChatBot", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <ChatBot />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  it("renders input", async () => {
    const input = await screen.findByLabelText("message input");
    expect(input).toBeInTheDocument();
  });

  it("input text", async () => {
    // console.log(server.listHandlers());
    const input = await screen.findByLabelText("message input");
    const test = "測試123";

    await user.type(input, test);
    expect(input).toHaveValue(test);

    await user.keyboard("{Enter}");
    expect(input).toHaveValue("");
  });
});
