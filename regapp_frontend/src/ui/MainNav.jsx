/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BiHomeAlt, BiLogOutCircle } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import {
  useAuthDispatch,
  useAuthState,
} from "../context/AuthenticationContext";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NavList = styled.ul``;

const StyledNavLink = styled(NavLink)`
  background-color: var(--color-grey-200);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  font-size: 1.25rem;
  padding: 0.75rem;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function MainNav() {
  const dispatch = useAuthDispatch();
  const authState = useAuthState();
  const navigate = useNavigate();

  const {
    login: { id: activeUserId },
  } = authState;

  function handleLogout() {
    dispatch({ type: "logout-success", payload: false });
    // ! LOGOUT STATE DUZELTILECEK
  }

  return (
    <StyledNav>
      <NavList>
        <StyledNavLink to={"/dashboard"}>
          <RxDashboard />
          Dashboard
        </StyledNavLink>
      </NavList>
      <NavList>
        <StyledNavLink to={"/vehicles"}>
          <BiHomeAlt />
          Home
        </StyledNavLink>
      </NavList>
      <NavList>
        <StyledNavLink to={`/profile/${activeUserId}`}>
          <CgProfile />
          Profile
        </StyledNavLink>
      </NavList>

      <NavList>
        <StyledNavLink to={"/login"} onClick={handleLogout}>
          <BiLogOutCircle />
          Log out
        </StyledNavLink>
      </NavList>
    </StyledNav>
  );
}

export default MainNav;
