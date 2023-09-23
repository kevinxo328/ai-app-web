import { useQuery } from "react-query";
import apiCliet from "@/lib/apiCliet";

export function useGetUser() {
  return useQuery("user", async () => {
    return await apiCliet.get("/user");
  });
}
