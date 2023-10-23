import styled from "styled-components";
import { Link } from "react-router-dom";

import LoginForm from "../ui/LoginForm";
import FormRow from "../ui/FormRow";

const StyledLogin = styled.main`
  height: 100vh;
  background-color: var(--color-grey-300);
  display: grid;
  justify-content: center;
  align-content: center;
  font-size: 1rem;
`;

const Background = styled.div`
  width: 50rem;
  height: auto;
  padding: 2.4rem 3.6rem;
  background-color: var(--color-grey-0);
`;

const Header = styled.div`
  text-align: center;
`;

const Footer = styled.div`
  text-align: center;
  padding-top: 1.2rem;
  border-top: 1px solid var(--color-grey-300);
`;

function Login() {
  return (
    <>
      <StyledLogin>
        <Background>
          <Header>
            <h2>Car App</h2>
            <h4>Devam etmek için lütfen giriş yapın</h4>
          </Header>
          <LoginForm />
          <FormRow>
            <Footer>
              <Link to={"/signup"}>Hesabınız yok mu? Kayıt Olun</Link>
            </Footer>
          </FormRow>
        </Background>
      </StyledLogin>
    </>
  );
}

export default Login;
