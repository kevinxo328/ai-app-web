import { useMutation, useQuery } from "react-query";
import { apiClient, getApiUrl } from "@/lib/apiClient.ts";
import {
  MutationOptions,
  // QueryOptions,
  // ResModels,
  ResOpenAI,
} from "@/types/api";

export function useGetUser() {
  return useQuery("/user", async () => {
    return await apiClient.get(getApiUrl("/user"));
  });
}

export function usePostOpenAI(options?: MutationOptions<ResOpenAI>) {
  return useMutation(async (message: string, temperature: number = 0) => {
    const query = new URLSearchParams();
    query.append("message", message);
    query.append("temperature", temperature.toString());
    return await apiClient.post(
      getApiUrl(`/openai/chat_completion?${query.toString()}`)
    );
  }, options);
}

// export function useGetModels(options?: QueryOptions<ResModels>) {
//   return useQuery(
//     "/openai/models",
//     async () => await apiClient.get(getApiUrl(`/openai/models`)),
//     options
//   );
// }
