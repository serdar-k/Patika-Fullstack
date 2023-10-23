import { useQuery } from "@tanstack/react-query";
import { getVehicle } from "../../services/apiVehicle";

export function useEditVehicle(vehicleId) {
  const {
    data: vehicleData,
    isLoading,
    error: axiosError,
    status,
  } = useQuery({
    queryKey: ["vehicleData", vehicleId],
    queryFn: (vehicleId) => getVehicle(vehicleId),
    // ! ON ERROR DURUMUNU EKLE
  });

  return { vehicleData, isLoading, axiosError, status };
}
