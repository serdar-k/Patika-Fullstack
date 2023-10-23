/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import AddNewCarForm from "../ui/AddNewCarForm";

function AddNewCar({ vehicle }) {
  return (
    <>
      <h2>AddNewCar</h2>
      <AddNewCarForm />
    </>
  );
}

export default AddNewCar;
