import { Container, Card, Button } from 'react-bootstrap';
import quizziaLogo from './Images/quizziaLogo.jpg';
const Login = () => {

  const authHandle = () => {
    window.location.href = '/auth/google';
  };

  return (
  <div id="loginMain" className='pt-5'>
    <Container className='w-50 d-flex justify-content-center mt-5'>
      <Card className='w-50' >
        <img src={quizziaLogo}/>
        <p className='text-center' style={{fontFamily: 'Stencil Std', fontSize: '2rem'}}>
          Get your quiz on
        </p>
        <p className='text-center' style={{fontFamily: 'Stencil Std', fontSize: '1.5rem'}}>Login With Google</p>
        <Button className='w-50 mx-auto mb-3' onClick={authHandle}>Login</Button>
      </Card>
    </Container>
  </div>
  );
};

export default Login;