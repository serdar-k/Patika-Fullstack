/* eslint-disable no-unused-vars */
import FormRow from "./FormRow";
import Input from "./Input";
import Button from "./Button";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useAddVehicle } from "../features/cars/useAddVehicle";
import { useContext, useMemo, useState } from "react";
import { AuthContext, useAuthState } from "../context/AuthenticationContext";
import { ErrorMessage } from "@hookform/error-message";

const AddNewCar = styled.form`
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  border: 1px solid var(--color-primary-600);
`;

const FormRowImage = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 0.5rem;
`;

const inputStyle = {
  backgroundColor: "var(--color-primary-600)",
};

function AddNewCarForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const { addVehicleAsync, isLoading, error } = useAddVehicle();
  // const { addVehicleImageAsync, isLoading: isLoadingImage } =
  //   useAddVehicleImage();

  const auth = useAuthState();
  const userId = auth.login.id;
  const fieldErrors = error?.response.data.validationErrors;

  let response;

  async function handleSave({ vehicleName, brand, model, modelYear, plate }) {
    const vehicleData = {
      vehicleName,
      brand,
      model,
      modelYear,
      plate,
    };
    response = await addVehicleAsync({ vehicleData, userId });

    // const formData = new FormData();

    // for (const key of Object.keys(images)) {
    //   formData.append("files", images[key]);
    // }

    // formData.append("userId", userId);
    // formData.append("vehicleId", vehicleData.plate);

    // console.log(images);
    // console.log(formData);

    // addVehicleImageAsync(formData);
    if (!fieldErrors) reset();
    if (response.status === 200) reset();
  }

  // function handleUpload(e) {
  //   if (e.target.files.length < 1) return;
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     setImagePreviews((prev) => [
  //       ...prev,
  //       URL.createObjectURL(e.target.files[i]),
  //     ]);
  //     setImages({ images: e.target.files });
  //   }
  // }

  return (
    <AddNewCar noValidate onSubmit={handleSubmit(handleSave)}>
      <FormRow label={"Vehicle name"}>
        <Input {...register("vehicleName")} />
      </FormRow>
      <FormRow label={"Brand"}>
        <Input {...register("brand")} />
      </FormRow>
      <FormRow label={"Model"}>
        <Input {...register("model")} />
      </FormRow>
      <FormRow label={"Model year"}>
        <Input
          type="number"
          min={"1900"}
          max={"2023"}
          {...register("modelYear")}
        />
      </FormRow>
      <FormRow label={"Plate"}>
        <Input {...register("plate")} />
      </FormRow>
      {/* <FormRowImage>
        <Input
          style={inputStyle}
          type="file"
          onChange={handleUpload}
          multiple
          accept="image/*"
        />
      </FormRowImage>
      <FormRowImage>
        {imagePreviews &&
          imagePreviews.map((image, index) => {
            return <Image src={image} key={index} />;
          })}
        <Image />
      </FormRowImage> */}

      <FormRow>
        <ButtonContainer>
          <Button size={"xsmall"} variation={"save"}>
            Save
          </Button>
          <Button size={"xsmall"} variation={"cancel"}>
            Cancel
          </Button>
        </ButtonContainer>
      </FormRow>
      <Input hidden {...register("userId")} defaultValue={userId} />
    </AddNewCar>
  );
}

export default AddNewCarForm;
