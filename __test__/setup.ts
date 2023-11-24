import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "@/mocks/server.ts";

expect.extend(matchers);

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// establish API mocking before all tests
beforeAll(() => server.listen());
afterEach(() => {
  // reset any request handlers that are declared as a part of our tests
  // (i.e. for testing one-time error scenarios)
  server.resetHandlers();
  cleanup();
});
// clean up once the tests are done
afterAll(() => server.close());
