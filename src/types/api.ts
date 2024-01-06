import { AxiosError } from "axios";

// https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2

export type GlobalError = AxiosError<{
  detail: string;
}>;
