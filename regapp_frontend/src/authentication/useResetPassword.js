import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useResetPassword() {
  const {
    mutateAsync: resetPasswordAsync,
    isLoading,
    error: axiosError,
  } = useMutation({
    mutationFn: ({ oldpassword, newpassword }) =>
      resetPassword({ oldpassword, newpassword }),
    onSuccess: () => {
      toast.success("Password succesfully updated!");
    },
    onError: (axiosError) => {
      let type = axiosError?.response.data.validationErrors;
      if (type.oldPassword) toast.error(type?.oldPassword);
      if (type.newPassword) toast.error(type?.newPassword);
    },
  });

  return { resetPasswordAsync, isLoading, axiosError };
}
