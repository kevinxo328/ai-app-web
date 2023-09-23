import { QueryClient, QueryClientConfig } from "react-query";

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
