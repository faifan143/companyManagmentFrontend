/* eslint-disable */
import { apiClient } from "@/utils/axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type MutationInput = Record<string, any>;
type MutationResponse = any;

interface UseCreateMutationParams<
  TInput = MutationInput,
  TResponse = MutationResponse
> {
  endpoint: string;
  onSuccessMessage?: string;
  invalidateQueryKeys?: string[];
  setSnackbarConfig: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "info" | "warning" | "error";
    }>
  >;
  onSuccessFn?: () => void;
  requestType?: "post" | "put" | "delete";
  options?: UseMutationOptions<TResponse, unknown, TInput, unknown>;
}

export const useCreateMutation = <
  TInput = MutationInput,
  TResponse = MutationResponse
>({
  endpoint,
  onSuccessMessage,
  invalidateQueryKeys = [],
  setSnackbarConfig,
  onSuccessFn,
  requestType = "post",
  options,
}: UseCreateMutationParams<TInput, TResponse>): UseMutationResult<
  TResponse,
  unknown,
  TInput,
  unknown
> => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutationAddFunction = async (data: TInput) => {
    const response = await apiClient.post(endpoint, data);
    return response as TResponse;
  };
  const mutationUpdateFunction = async (data: TInput) => {
    const response = await apiClient.put(endpoint, data);
    return response as TResponse;
  };
  const mutationDeleteFunction = async () => {
    const response = await apiClient.delete(endpoint);
    return response as TResponse;
  };

  return useMutation<TResponse, unknown, TInput>({
    mutationFn:
      requestType == "post"
        ? mutationAddFunction
        : requestType == "put"
        ? mutationUpdateFunction
        : mutationDeleteFunction,
    onSuccess: (data: TResponse) => {
      if (onSuccessMessage) {
        console.log(onSuccessMessage, data);
      }
      setSnackbarConfig({
        open: true,
        message: onSuccessMessage || t("Successful"),
        severity: "success",
      });
      onSuccessFn && onSuccessFn();
      invalidateQueryKeys.forEach((key) => {
        //@ts-ignore
        queryClient.invalidateQueries(key);
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || t("An error occurred");

      console.error("Detailed Error:", errorMessage);

      setSnackbarConfig({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    },
    ...options,
  });
};
