import axios from "axios";

export const getApiUrl = (url: string) => {
  return import.meta.env.VITE_API_URL + url;
};
export const apiClient = axios.create();
