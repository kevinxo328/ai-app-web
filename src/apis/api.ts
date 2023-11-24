import { useMutation, useQuery } from "react-query";
import { apiClient, getApiUrl } from "@/lib/apiClient.ts";
import {
  MutationOptions,
  ReqChatCompletion,
  // QueryOptions,
  // ResModels,
  ResChatCompletion,
} from "@/types/api";

export function useGetUser() {
  return useQuery("/user", async () => {
    return await apiClient.get(getApiUrl("/user"));
  });
}

export function usePostChatCompletion(
  options?: MutationOptions<ResChatCompletion, ReqChatCompletion>
) {
  return useMutation(async (data: ReqChatCompletion) => {
    return await apiClient.post(getApiUrl(`/openai/chat_completion`), {
      ...data,
    });
  }, options);
}

// export function useGetModels(options?: QueryOptions<ResModels>) {
//   return useQuery(
//     "/openai/models",
//     async () => await apiClient.get(getApiUrl(`/openai/models`)),
//     options
//   );
// }
