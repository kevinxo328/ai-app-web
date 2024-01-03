import { AxiosError, AxiosResponse } from "axios";
import {
  MutationKey,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

// https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2

export type GlobalError = AxiosError<{
  detail: string;
}>;

export type AppMutationOptions<
  ResponseData = unknown,
  RequestData = unknown,
  ErrorData = GlobalError,
> =
  | Omit<
      UseMutationOptions<
        AxiosResponse<ResponseData>,
        AxiosError<ErrorData>,
        RequestData,
        MutationKey
      >,
      "mutationFn"
    >
  | undefined;

export type AppQueryOptions<ResponseData = unknown, ErrorData = GlobalError> =
  | Omit<
      UseQueryOptions<
        AxiosResponse<ResponseData>,
        AxiosError<ErrorData>,
        AxiosResponse<ResponseData>,
        QueryKey
      >,
      "queryKey" | "queryFn"
    >
  | undefined;

export type ReqChatCompletion = {
  user_prompt: string;
  temperature?: number;
  sys_prompt?: string;
  model?: string;
  stream?: boolean;
};

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
