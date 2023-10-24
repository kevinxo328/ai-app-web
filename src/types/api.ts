import { AxiosError, AxiosResponse } from "axios";
import { UseMutationOptions } from "react-query";

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

export type ResOpenAI = {
  res: Record<string, unknown>;
  content: string;
};
