import { useAuthState } from "../context/AuthenticationContext";

function Welcome() {
  const authState = useAuthState();
  const username = authState.login.username;
  return (
    <>
      <h3>Welcome {username[0].toUpperCase() + username.slice(1)}</h3>
      <h4>Please select an option from side menu!</h4>
    </>
  );
}

export default Welcome;
