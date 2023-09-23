import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany
// https://v5.reactrouter.com/web/guides/testing
describe("App", () => {
  it("renders headline", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const headline = screen.getByText(
      /Click on the Vite and React logos to learn more/i,
    );
    expect(headline).toBeInTheDocument();
  });
});
