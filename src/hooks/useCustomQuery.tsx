/* eslint-disable @typescript-eslint/ban-ts-comment */
import { apiClient } from "@/utils/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface CustomQueryOptions<TData>
  extends Omit<UseQueryOptions<TData, Error, TData>, "queryKey" | "queryFn"> {
  queryKey: string[];
  url: string;
  setSnackbarConfig: Dispatch<
    SetStateAction<{
      open: boolean;
      message: string;
      severity: "success" | "info" | "warning" | "error";
    }>
  >;
  nestedData?: boolean;
}

const useCustomQuery = <TData,>({
  queryKey,
  url,
  setSnackbarConfig,
  nestedData = false,
  ...options
}: CustomQueryOptions<TData>) => {
  return useQuery<TData>({
    queryKey,
    queryFn: async (): Promise<TData> => {
      try {
        const response = await apiClient.get<TData>(url);
        // @ts-ignore
        return nestedData ? response.data : response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setSnackbarConfig({
            open: true,
            message: `Error: ${
              error.response.data.message || "An error occurred"
            }`,
            severity: "error",
          });
        } else {
          setSnackbarConfig({
            open: true,
            message: "Network error. Please try again later.",
            severity: "error",
          });
        }
        throw error;
      }
    },
    retry: 1,
    ...options,
  });
};

export default useCustomQuery;
