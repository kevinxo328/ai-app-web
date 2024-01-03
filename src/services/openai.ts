import { useMutation } from "@tanstack/react-query";
import { apiClient, getApiUrl } from "@/libs/apiClient";
import {
  AppMutationOptions,
  ReqChatCompletion,
  // QueryOptions,
  // ResModels,
  ResChatCompletion,
} from "@/types/api";

export function usePostChatCompletion(
  options?: AppMutationOptions<ResChatCompletion, ReqChatCompletion>,
  stateKey?: string | Record<string, unknown>
) {
  const method = "post";
  const endpoint = "/openai/chat_completion";
  const key: unknown[] = [endpoint, method];

  stateKey && key.push(stateKey);

  const fetchPostChatCompletions = async (data: ReqChatCompletion) => {
    return await apiClient.request({
      method,
      url: getApiUrl(endpoint),
      data,
    });
  };

  return {
    key,
    query: useMutation({
      mutationKey: key,
      mutationFn: fetchPostChatCompletions,
      ...options,
    }),
  };
}

// export function useGetModels(options?: QueryOptions<ResModels>) {
//   return useQuery(
//     "/openai/models",
//     async () => await apiClient.get(getApiUrl(`/openai/models`)),
//     options
//   );
// }
