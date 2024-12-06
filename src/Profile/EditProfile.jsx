import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';

const EditProfile = ({ userId, setBio, setFavoriteGenre, setOccupation, setEdit }) => {
  const [bioText, setBioText] = useState('');
  const [genreText, setGenreText] = useState('');
  const [occupationText, setOccupationText] = useState('');

  const updateProfile = () => {
    // axios.put()
  };

  return (
    <>
      <Container className='w-50'>
        <Card className='w-100'>
          <Card.Header className='d-flex justify-content-between'>
            <div>Edit Profile</div>
            <Button>X</Button>
          </Card.Header>
          <Form>
            <Form.Group>
              <Form.Label>Bio:</Form.Label>
              <Form.Text></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Favorite Genre:</Form.Label>
              <Form.Text></Form.Text>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;