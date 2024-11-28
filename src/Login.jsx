import { Container, Card, Button } from 'react-bootstrap';
import quizziaLogo from './Images/quizziaLogo.jpg';
const Login = () => {

  const authHandle = () => {
    window.location.href = '/auth/google';
  };

  return (
  <div id="loginMain" className='pt-5'>
    <Container className='w-50 d-flex justify-content-center mt-5'>
      <Card className='w-50'>
        <img src={quizziaLogo} />
        <Button className='w-50 mx-auto mb-3' onClick={authHandle}>Google</Button>
      </Card>
    </Container>
  </div>
  );
};

export default Login;