/* eslint-disable */
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

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

  const mutationAddFunction = async (data: TInput) => {
    const response = await axios.post(`http://${baseUrl}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    return response.data;
  };
  const mutationUpdateFunction = async (data: TInput) => {
    const response = await axios.put(`http://${baseUrl}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    return response.data;
  };
  const mutationDeleteFunction = async (data: TInput) => {
    const response = await axios.delete(`http://${baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
    return response.data;
  };

  const { t } = useTranslation();

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
      console.error(t("Error during the create/add request:"), error);
      setSnackbarConfig({
        open: true,
        message: `${t("Error")}: ${error.message || t("An error occurred")}`,
        severity: "error",
      });
    },
    ...options,
  });
};
