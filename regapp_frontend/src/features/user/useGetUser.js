/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUser";

export function useGetUser(userId) {
  // ! USEQUERY PARAMETRELI FONKSIYON CAGRILARI ARASTIR

  const {
    data: userData,
    isLoading,
    error: axiosError,
  } = useQuery({
    // ! GETUSER ICIN PARAMETRE QUERYKEY ICERISINDE BULUNUYOR
    queryKey: ["user", userId],
    queryFn: (userId) => getUser(userId),
  });

  return { userData, isLoading, axiosError };
}
