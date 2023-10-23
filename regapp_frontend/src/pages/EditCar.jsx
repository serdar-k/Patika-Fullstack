/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { styled } from "styled-components";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { useDeleteVehicle } from "../features/cars/useDeleteVehicle";
import { useEditVehicle } from "../features/cars/useEditVehicle";
import { useUpdateVehicle } from "../features/cars/useUpdateVehicle";
import { useEffect } from "react";
import { useAuthState } from "../context/AuthenticationContext";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

function EditCar() {
  const params = useParams();
  const editCarId = params.id;
  const auth = useAuthState();
  const userId = auth.login.id;

  const { register, handleSubmit } = useForm();

  const { vehicleData, isLoading, axiosError, status } =
    useEditVehicle(editCarId);

  const {
    updateVehicleAsync,
    isLoading: updateLoading,
    axiosError: updateError,
    status: updateStatus,
  } = useUpdateVehicle();

  let datas = {};

  if (status === "success") {
    datas = vehicleData.data;
  }

  function handleEditSave({ vehicleName, brand, model, modelYear, plate }) {
    const updatedVehicleData = { vehicleName, brand, model, modelYear, plate };
    updateVehicleAsync({ editCarId, updatedVehicleData });
  }

  if (status === "loading") return <h2>Vehicle data fetching...</h2>;

  return (
    <>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit(handleEditSave)}>
        <FormRow label={"Vehicle name"}>
          <Input
            {...register("vehicleName")}
            defaultValue={datas.vehicleName}
          />
        </FormRow>
        <FormRow label={"Brand"}>
          <Input {...register("brand")} defaultValue={datas.brand} />
        </FormRow>
        <FormRow label={"Model"}>
          <Input {...register("model")} defaultValue={datas.model} />
        </FormRow>
        <FormRow label={"Model year"}>
          <Input
            type="number"
            min={"1900"}
            max={"2023"}
            {...register("modelYear")}
            defaultValue={datas.modelYear}
          />
        </FormRow>
        <FormRow label={"Plate"}>
          <Input {...register("plate")} defaultValue={datas.plate} />
        </FormRow>

        <FormRow>
          <ButtonContainer>
            <Button variation={"save"}>Save</Button>
            <Button variation={"cancel"}>Cancel</Button>
          </ButtonContainer>
        </FormRow>
      </form>
    </>
  );
}

export default EditCar;
