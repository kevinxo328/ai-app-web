import { AxiosError, AxiosResponse } from "axios";
import { UseMutationOptions, UseQueryOptions } from "react-query";

// https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2

export type GlobalError = {
  detail: string;
};

export type MutationOptions<ResponseData, ErrorData = GlobalError> =
  | Omit<
      UseMutationOptions<
        AxiosResponse<ResponseData>,
        AxiosError<ErrorData>,
        string,
        unknown
      >,
      "mutationFn"
    >
  | undefined;

export type QueryOptions<ResponseData, ErrorData = GlobalError> =
  | Omit<
      UseQueryOptions<
        AxiosResponse<ResponseData>,
        AxiosError<ErrorData>,
        AxiosResponse<ResponseData>,
        string
      >,
      "queryKey" | "queryFn"
    >
  | undefined;

export type ResChatCompletion = {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  choices: Array<Record<string, any>>;
  created?: string;
  model?: string;
  object?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type ResModels = Array<{ deployment_id: string; model: string }>;
