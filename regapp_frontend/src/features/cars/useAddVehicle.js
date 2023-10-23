/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { addVehicle, addVehicleImage } from "../../services/apiVehicle";
import { toast } from "react-hot-toast";

export function useAddVehicle() {
  const {
    mutateAsync: addVehicleAsync,
    isLoading,
    error,
  } = useMutation({
    // ! BU FONKSIYONLAR SADECE BIR PARAMETRE ALABILIR, FAZLA PARAMETRE GONDERMEK ICIN OBJE SEKLINDE KULLANILDI
    mutationFn: ({ vehicleData, userId }) =>
      addVehicle({ vehicleData, userId }),
    onSuccess: () => {
      toast.success("Vehicle successfully added!");
    },
    onError: (error) => {
      let type = error.response.data.validationErrors;
      // if (type.vehicleName) toast.error(type.vehicleName);
      // if (type.brand) toast.error(type.brand);
      // if (type.model) toast.error(type.model);
      // if (type.modelYear) toast.error(type.modelYear);
      // if (type.plate) toast.error(type.plate);
      toast(
        type.vehicleName +
          "\n" +
          type.brand +
          "\n" +
          type.model +
          "\n" +
          type.modelYear +
          "\n" +
          type.plate,
        {
          duration: 5000,
        }
      );
    },
  });

  return { addVehicleAsync, isLoading, error };
}

// export function useAddVehicleImage() {
//   const {
//     mutateAsync: addVehicleImageAsync,
//     isLoading,
//     error: axiosError,
//   } = useMutation({
//     mutationFn: (formData) => addVehicleImage(formData),
//     onSuccess: () => {
//       toast.success("Vehicle image successfully added!");
//     },
//     onError: (axiosError) => {
//       let type = axiosError?.response.data.validationErrors;
//       console.log(type);
//       if (type.plate) toast.error(type.plate);
//     },
//   });

//   return { addVehicleImageAsync, isLoading, axiosError };
// }
