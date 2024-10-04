/* eslint-disable */
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.BASE_URL || "";

type MutationInput = Record<string, any>;
type MutationResponse = any;

interface UseCreateMutationParams<
  TInput = MutationInput,
  TResponse = MutationResponse
> {
  endpoint: string;
  onSuccessMessage?: string;
  invalidateQueryKeys?: string[];
  options?: UseMutationOptions<TResponse, unknown, TInput, unknown>;
}

export const useCreateMutation = <
  TInput = MutationInput,
  TResponse = MutationResponse
>({
  endpoint,
  onSuccessMessage,
  invalidateQueryKeys = [],
  options,
}: UseCreateMutationParams<TInput, TResponse>): UseMutationResult<
  TResponse,
  unknown,
  TInput,
  unknown
> => {
  const queryClient = useQueryClient();

  const mutationFunction = async (data: TInput) => {
    const response = await axios.post(`https://${baseUrl}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    return response.data;
  };

  return useMutation<TResponse, unknown, TInput>({
    mutationFn: mutationFunction,
    onSuccess: (data: TResponse) => {
      if (onSuccessMessage) {
        console.log(onSuccessMessage, data);
      }

      invalidateQueryKeys.forEach((key) => {
        //@ts-ignore
        queryClient.invalidateQueries(key);
      });
    },
    onError: (error: unknown) => {
      console.error("Error during the create/add request:", error);
    },
    ...options,
  });
};
