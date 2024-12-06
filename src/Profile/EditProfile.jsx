import axios from 'axios';
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

const EditProfile = ({ userId, setBio, setFavoriteGenre, setOccupation, setEdit }) => {
  const [bioText, setBioText] = useState('');
  const [genreText, setGenreText] = useState('');
  const [occupationText, setOccupationText] = useState('');

  const updateProfile = () => {
    axios.put()
  };

  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Bio:</Form.Label>
            <Form.Text></Form.Text>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default EditProfile;