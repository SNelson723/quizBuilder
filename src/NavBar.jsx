import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div id='navBar'>
      <Navbar collapseOnSelect bg="dark" data-bs-theme="dark" className='h-100'>
        <Container>
          <Navbar.Brand as="span" to="/home">Quizzia</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" id="homeLink">Home</Nav.Link>
            <Nav.Link as={Link} to="/game" id="gameLink">Quizzia!</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;