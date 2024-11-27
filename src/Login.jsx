import { Button } from 'react-bootstrap';
// import axios from 'axios';

const Login = () => {

  const authHandle = () => {
    window.location.href = '/auth/google';
  };
  return (
  <>
    <Button onClick={authHandle}>Login with Google</Button>
  </>
  );
};

export default Login;