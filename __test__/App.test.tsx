import { render, screen } from "@testing-library/react";
import App from "../src/App";

// https://dev.to/pacheco/configure-vitest-with-react-testing-library-5cbb
// https://stackoverflow.com/questions/57861187/property-tobeinthedocument-does-not-exist-on-type-matchersany
describe("App", () => {
  it("renders headline", () => {
    render(<App />);
    const headline = screen.getByText(
      /Click on the Vite and React logos to learn more/i
    );
    expect(headline).toBeInTheDocument();
  });
});
