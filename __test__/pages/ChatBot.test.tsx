import { render, screen } from "@testing-library/react";
import ChatBot from "@/pages/ChatBot";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/reactQuery";
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
      </MemoryRouter>,
    );
  });

  it("renders input", async () => {
    const input = await screen.findByPlaceholderText("輸入文字");
    expect(input).toBeInTheDocument();
  });

  it("input text", async () => {
    const input = (await screen.findByPlaceholderText(
      "輸入文字",
    ));
    const test = "測試123";

    await user.type(input, test);
    expect(input).toHaveValue(test);

    await user.keyboard('{Enter}');
    expect(input).toHaveValue("");

    const target = await screen.findByText(test);
    expect(target).toBeInTheDocument();
  });
});
