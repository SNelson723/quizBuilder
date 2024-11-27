import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/logout'); // Call the logout endpoint
      navigate('/'); // Redirect to login page or home page after logging out
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div id='navBar'>
      <Navbar collapseOnSelect bg="dark" data-bs-theme="dark" className='h-100'>
        <Container>
          <Navbar.Brand as="span" to="/home">Quizzia</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" id="homeLink">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile" id="profileLink">Profile</Nav.Link>
            <Nav.Link as={Link} to="/game" id="gameLink">Quizzia!</Nav.Link>
          </Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;