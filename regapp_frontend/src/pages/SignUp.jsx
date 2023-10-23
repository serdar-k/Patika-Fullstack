import { Link } from "react-router-dom";
import styled from "styled-components";
import SignUpForm from "../ui/SignUpForm";
import FormRow from "../ui/FormRow";

const StyledSignUp = styled.main`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;
  background-color: var(--color-grey-300);
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

function SignUp() {
  return (
    <StyledSignUp>
      <Background>
        <Header>
          <h2>Car App</h2>
          <h4>Kayıt Ol</h4>
        </Header>
        <SignUpForm />
        <FormRow>
          <Footer>
            <Link to={"/login"}>Zaten hesabınız var mı? Giriş Yapın</Link>
          </Footer>
        </FormRow>
      </Background>
    </StyledSignUp>
  );
}

export default SignUp;
