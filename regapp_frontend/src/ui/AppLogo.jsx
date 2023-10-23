/* eslint-disable react/prop-types */
import { styled } from "styled-components";

const Logo = styled.img`
  width: 10rem;
  height: 5rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function AppLogo({ src }) {
  return (
    <Container>
      <Logo src={src} />
    </Container>
  );
}

export default AppLogo;
