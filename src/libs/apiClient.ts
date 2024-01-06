import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";

export const getApiUrl = (url: string) => {
  return import.meta.env.VITE_API_URL + "/api" + url;
};

const apiClient = axios.create();
const authClient = axios.create({
  baseURL: getApiUrl("/"),
  withCredentials: true,
});

authClient.interceptors.request.use(
  (config) => {
    const access_token = useAuthStore.getState().access_token;
    if (access_token) {
      config.headers["Authorization"] = "Bearer " + access_token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest.headers["RETRIED_AUTH"]
    ) {
      originalRequest.headers["RETRIED_AUTH"] = true;
      const refresh_token = useAuthStore.getState().refresh_token;
      const params = new URLSearchParams();
      params.append("refresh_token", refresh_token || "");

      const res = await apiClient.post(
        getApiUrl("/auth/token/refresh" + "?" + params.toString())
      );
      if (res.status === 200) {
        useAuthStore.getState().setState(res.data);
        return authClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient, authClient };
