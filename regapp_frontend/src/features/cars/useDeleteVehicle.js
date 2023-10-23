import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle } from "../../services/apiVehicle";
import toast from "react-hot-toast";

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: deleteVehicleAsync,
    isLoading,
    error: axiosError,
  } = useMutation({
    mutationFn: (vehicleId) => deleteVehicle(vehicleId),
    onSuccess: () => {
      toast.success("Vehicle deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });

  return { deleteVehicleAsync, isLoading, axiosError };
}
