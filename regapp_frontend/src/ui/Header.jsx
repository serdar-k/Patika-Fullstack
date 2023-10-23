import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 1rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>Car Registration App</StyledHeader>;
}

export default Header;
