import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";

interface CustomQueryOptions<T> extends UseQueryOptions<T> {
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

const useCustomQuery = <T,>({
  queryKey,
  url,
  setSnackbarConfig,
  nestedData = false,
  ...options
}: CustomQueryOptions<T>) => {
  return useQuery<T>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        return nestedData ? response.data.data : response.data;
      } catch (error) {
        // Display error message using snackbarConfig
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
    retry: 2,
    ...options,
  });
};

export default useCustomQuery;
