import styled from "styled-components";
import MainNav from "./MainNav";
import AppLogo from "./AppLogo";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-200);
  padding: 1.2rem 1.8rem;
  border-right: 1px solid var(--color-grey-100);

  grid-column: 1 / 2;
  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <AppLogo src={"../public/logo.webp"} />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
