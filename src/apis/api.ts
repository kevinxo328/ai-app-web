import { useMutation, useQuery } from "react-query";
import apiCliet from "@/lib/apiCliet";
import { MutationOptions, ResOpenAI } from "@/types/api";

export function useGetUser() {
  return useQuery("/user", async () => {
    return await apiCliet.get("/user");
  });
}

export function usePostOpenAI(options?: MutationOptions<ResOpenAI>) {
  return useMutation(async (text: string) => {
    const query = new URLSearchParams();
    query.append("text", text);
    return await apiCliet.post(`/openai?${query.toString()}`);
  }, options);
}
