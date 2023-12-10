import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { worker } from "@/mocks/browser";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/reactQuery";
import { ThemeProvider } from "./contexts/theme-context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

if (
  process.env.NODE_ENV === "development" &&
  import.meta.env.VITE_API_URL.indexOf("http://") > -1
) {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
