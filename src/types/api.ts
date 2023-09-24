import { AxiosResponse } from "axios";
import { UseMutationOptions } from "react-query";

// https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2
export type MutationOptions<ResponseData> =
  | Omit<
      UseMutationOptions<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        AxiosResponse<ResponseData, any>,
        unknown,
        string,
        unknown
      >,
      "mutationFn"
    >
  | undefined;

export type ResOpenAI = {
  message: string;
};
