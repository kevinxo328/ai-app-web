import { MutateOptions, useMutation } from "@tanstack/react-query";
import { authClient } from "@/libs/apiClient";
import { ChatCompletion, ChatCompletionConfig } from "@/types/openai";
import { GlobalError } from "@/types/api";

export function usePostChatCompletion(
  options?: MutateOptions<ChatCompletion, GlobalError, ChatCompletionConfig>,
  stateKey?: string | Record<string, unknown>
) {
  const method = "post";
  const endpoint = "/openai/chat_completion";
  const key: unknown[] = [endpoint, method];

  stateKey && key.push(stateKey);

  const fetchPostChatCompletions = async (data: ChatCompletionConfig) => {
    const res = await authClient.request<ChatCompletion>({
      method,
      url: endpoint,
      data,
    });

    return res.data;
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
