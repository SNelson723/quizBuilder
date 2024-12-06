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

  const handleOnChange = (e) => {

  };

  return (
    <>
      <Container className='w-50 mt-5'>
        <Card className='w-100'>
          <Card.Header className='d-flex justify-content-between' style={{backgroundColor: '#b3cde4'}}>
            <div className='my-auto ms-1 fs-5'>Edit Profile</div>
            <Button className='rounded-circle text-black' style={{backgroundColor: '#b3cde4', borderColor: '#b3cde4'}} onClick={() => setEdit(false)}>X</Button>
          </Card.Header>
          <Card.Body style={{backgroundColor: '#eef3f9'}}>
            <Form className='my-2'>
              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Bio:</Form.Label>
                <Form.Control type='text' onChange={setBioText} />
              </Form.Group>

              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Favorite Genre:</Form.Label>
                <Form.Control id='genre' type='text' onChange={(setGenreText)} />
              </Form.Group>

              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Occupation:</Form.Label>
                <Form.Control id='occupation' type='text' onChange={setOccupationText} />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;