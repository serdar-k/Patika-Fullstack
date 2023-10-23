/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { styled } from "styled-components";
import VehicleOperations from "../../ui/VehicleOperations";
import { formatDate } from "../../helpers/helpers";
import { useAuthState } from "../../context/AuthenticationContext";
import { AiOutlineUserSwitch } from "react-icons/ai";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 1.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableSearchRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 1.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 2rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-grey-600);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Brand = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-grey-600);
`;

const Model = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-grey-600);
`;

const ModelYear = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-grey-600);
  overflow-x: hidden;
`;

const Plate = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-grey-600);
`;

const LogoContainer = styled.div`
  background-color: var(--color-primary-100);
  border-radius: 50%;
  padding: 0.3rem 0.5rem;
`;

function VehicleRow({ vehicle, searchState }) {
  const authDetails = useAuthState();
  const isUserAuth = !searchState && vehicle.user.id === authDetails.login.id;

  if (searchState && !vehicle) {
    return (
      <>
        <TableSearchRow>
          <Name>
            {isUserAuth && (
              <LogoContainer>
                <AiOutlineUserSwitch />
              </LogoContainer>
            )}
            {searchState.vehicleName}
          </Name>
          <Brand>{searchState.brand}</Brand>
          <Model>{searchState.model}</Model>
          <ModelYear>{searchState.modelYear}</ModelYear>
          <Plate>{searchState.plate}</Plate>
        </TableSearchRow>
      </>
    );
  }

  return (
    <>
      <TableRow>
        <Name>
          {isUserAuth && (
            <LogoContainer>
              <AiOutlineUserSwitch />
            </LogoContainer>
          )}
          {vehicle.vehicleName}
        </Name>
        <Brand>{vehicle.brand}</Brand>
        <Model>{vehicle.model}</Model>
        <ModelYear>{vehicle.modelYear}</ModelYear>
        <Plate>{vehicle.plate}</Plate>
        {isUserAuth && <VehicleOperations vehicle={vehicle} />}
      </TableRow>
    </>
  );
}

export default VehicleRow;
