import { apiClient, getApiUrl } from "@/libs/apiClient";
import { GlobalError } from "@/types/api";
import { Token } from "@/types/auth";
import { CreateUser } from "@/types/user";
import { MutateOptions, useMutation } from "@tanstack/react-query";

export function usePostToken(
  options?: MutateOptions<Token, GlobalError, CreateUser>,
  stateKey?: string | Record<string, unknown>
) {
  const method = "post";
  const endpoint = "/auth/token";

  const key: unknown[] = [endpoint, method];
  stateKey && key.push(stateKey);

  const fetchPostToken = async (data: CreateUser) => {
    const params = new URLSearchParams();
    params.append("username", data["username"]);
    params.append("password", data["password"]);

    const res = await apiClient.request<Token>({
      method,
      url: getApiUrl(endpoint),
      data: params,
    });
    return res.data;
  };

  return {
    key,
    query: useMutation<Token, GlobalError, CreateUser>({
      mutationKey: key,
      mutationFn: fetchPostToken,
      ...options,
    }),
  };
}
