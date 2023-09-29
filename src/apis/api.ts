import { useMutation, useQuery } from "react-query";
import apiClient from "@/lib/apiClient.ts";
import { MutationOptions, ResOpenAI } from "@/types/api";

export function useGetUser() {
  return useQuery("/user", async () => {
    return await apiClient.get("/user");
  });
}

export function usePostOpenAI(options?: MutationOptions<ResOpenAI>) {
  return useMutation(async (text: string) => {
    const query = new URLSearchParams();
    query.append("text", text);
    return await apiClient.post(`/openai?${query.toString()}`);
  }, options);
}
