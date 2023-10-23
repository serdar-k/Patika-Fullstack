/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signUpApi } from "../services/apiAuth";

function delay() {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, 3000);
  });
}

export function useSignup() {
  const {
    mutateAsync: signup,
    isLoading,
    error: axiosError,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.promise(delay(), {
        loading: "Creating user...",
        success: "User created!",
        error: "User could not be created!",
      });
    },
    onError: (axiosError) => {
      let type = axiosError?.response.data.validationErrors;
      if (type.username) toast.error(type.username);
      if (type.email) toast.error(type.email);
      if (type.password) toast.error(type.password);
    },
  });

  return { signup, isLoading, axiosError };
}
