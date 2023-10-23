/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getVehicles, getVehiclesByUserId } from "../../services/apiVehicle";
/*
export function useVehicles() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const {
    data: cars,
    isLoading,
    error,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["cars", page],
    queryFn: () => getVehicles(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (cars?.hasMore) {
      queryClient.prefetchQuery(["cars", page + 1], () =>
        getVehicles(page + 1)
      );
    }
  }, [cars, page, queryClient]);

  return { cars, isLoading, error };
}
*/

export function useVehicles(id) {
  const {
    data: vehicleData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userVehicles", id],
    queryFn: (id) => getVehiclesByUserId(id),
  });

  return { vehicleData, isLoading, error };
}
