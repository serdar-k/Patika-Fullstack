import { useMutation } from "@tanstack/react-query";
import { updateVehicle } from "../../services/apiVehicle";
import toast from "react-hot-toast";

export function useUpdateVehicle() {
  const {
    mutateAsync: updateVehicleAsync,
    isLoading,
    error: axiosError,
  } = useMutation({
    mutationFn: (vehicleData) => updateVehicle(vehicleData),
    onSuccess: () => {
      toast.success("Vehicle successfully updated!");
    },
    onError: () => {
      toast.error(axiosError);
    },
  });

  return { updateVehicleAsync, isLoading, axiosError };
}
