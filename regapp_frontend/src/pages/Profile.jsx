/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import EditUser from "../features/user/EditUser";
import { useGetUser } from "../features/user/useGetUser";
import { getUser } from "../services/apiUser";
import styled from "styled-components";
import { useVehicles } from "../features/cars/useVehicles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 1rem;
`;

const PasswordContainer = styled.div``;

const Headers = styled.div``;

const HeadersRow = styled.div``;

const Info = styled.div``;
const InfoRow = styled.div``;

function Profile() {
  const params = useParams();
  const activeUserId = params.id;
  const { userData, isLoading, axiosError } = useGetUser(activeUserId);

  const {
    vehicleData,
    isLoading: isLoadingVehicles,
    error,
  } = useVehicles(activeUserId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h4>User Info</h4>
      <ProfileContainer>
        <Headers>
          <HeadersRow>Username</HeadersRow>
          <HeadersRow>Email</HeadersRow>
          <HeadersRow>Registered Vehicle</HeadersRow>
        </Headers>
        <Info>
          <InfoRow>{userData?.data.username}</InfoRow>
          <InfoRow>{userData?.data.email}</InfoRow>
          <InfoRow>{vehicleData?.data.length}</InfoRow>
        </Info>
      </ProfileContainer>
      <PasswordContainer>
        <h4>Change Password</h4>
        <EditUser />
      </PasswordContainer>
    </Container>
  );
}

export default Profile;
