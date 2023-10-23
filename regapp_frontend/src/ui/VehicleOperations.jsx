/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteVehicle } from "../features/cars/useDeleteVehicle";

const Operations = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function VehicleOperations({ vehicle }) {
  const vehicleToEdit = vehicle;
  const vehicleId = vehicle.id;
  const navigate = useNavigate();
  const { deleteVehicleAsync } = useDeleteVehicle();

  function handleEdit(vehicle) {
    navigate(`/editcar/${vehicleToEdit.id}`);
  }

  function handleDelete() {
    deleteVehicleAsync(vehicleId);
  }

  return (
    <Operations>
      <Button variation="delete" onClick={handleDelete}>
        <BiTrash />
      </Button>
      <Button
        variation="edit"
        onClick={(vehicleToEdit) => handleEdit(vehicleToEdit)}
      >
        <BiEditAlt />
      </Button>
    </Operations>
  );
}

export default VehicleOperations;
