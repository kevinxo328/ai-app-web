import { fireEvent, render, screen } from "@testing-library/react";
import ChatBot from "@/pages/ChatBot";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/reactQuery";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany

describe("ChatBot", () => {
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
    const input = await screen.findByPlaceholderText("輸入文字");
    expect(input).toBeInTheDocument();
  });

  it("input text", async () => {
    const input = await screen.findByPlaceholderText("輸入文字") as HTMLInputElement;
    const test = "測試123";

    fireEvent.change(input, { target: { value: test } });
    expect(input.value).toBe(test);

    fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
    expect(input.value).toBe('');

    const target = await screen.findByText(test);
    expect(target).toBeInTheDocument();
  });
});
