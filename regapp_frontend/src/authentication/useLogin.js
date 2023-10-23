/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { delay } from "../helpers/helpers";

export function useLogin() {
  const {
    isLoading,
    error: axiosError,
    mutateAsync: login,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.promise(delay(), {
        loading: "Signing in...",
        success: "Login successful!",
        error: "Login failed!",
      });
    },
    onError: (axiosError) => {
      const errorType = axiosError.response.data.validationErrors;
      // ! HATA DUZELTMESI GEREKLI
      if (axiosError.response.data.status === 400 && errorType.email) {
        toast.error(errorType.email);
      }
      if (axiosError.response.data.status === 400 && errorType.password) {
        toast.error(axiosError.response.data.validationErrors.password);
      }
      if (axiosError.response.data.status === 401)
        toast.error(axiosError.response.data.message);
    },
  });

  return { login, isLoading, axiosError };
}
