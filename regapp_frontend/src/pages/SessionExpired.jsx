/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { ButtonContainer } from "../features/cars/VehicleTable";
import { refreshTokenRequest } from "../authentication/useRefresh";
import { useAuthDispatch } from "../context/AuthenticationContext";

function SessionExpired() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  function redirectLogin() {
    dispatch({ type: "logout-success" });

    navigate("/login");
  }

  function handleRefresh() {
    refreshTokenRequest();
    navigate("/welcome");
  }

  return (
    <>
      <div>Your session is expired! Please login!</div>
      <Button size={"xsmall"} onClick={redirectLogin}>
        Logout
      </Button>

      {/* <ButtonContainer>
        <Button size={"xsmall"} onClick={redirectLogin}>
          Logout
        </Button>
        <Button size={"xsmall"} onClick={handleRefresh}>
          Continue
        </Button>
      </ButtonContainer> */}
    </>
  );
}

export default SessionExpired;
