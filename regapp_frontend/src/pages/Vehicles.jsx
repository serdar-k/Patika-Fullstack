import { useNavigate } from "react-router-dom";
import VehicleTable from "../features/cars/VehicleTable";
import Button from "../ui/Button";
import Row from "../ui/Row";
import Search from "../ui/Search";

function Cars() {
  const navigate = useNavigate();

  function navigateAddNewCar() {
    navigate("/addnewcar");
  }
  return (
    <>
      <Row>
        <Button size={"xsmall"} onClick={navigateAddNewCar}>
          + Add New Car
        </Button>
        <Search />
      </Row>
      <VehicleTable />
    </>
  );
}

export default Cars;
