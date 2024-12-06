import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';

const EditProfile = ({ userId, setBio, setFavoriteGenre, setOccupation, setEdit, bio, favoriteGenre, occupation }) => {
  const [bioText, setBioText] = useState('');
  const [genreText, setGenreText] = useState('');
  const [occupationText, setOccupationText] = useState('');

  const updateProfile = async () => {
    try {
      if (bio !== bioText) setBio(bioText);
      await axios.put(`/editProfile/${userId}`, {bio: bioText, favoriteGenre: genreText, occupation: occupationText});

    } catch (err) {
      console.log(err);
    } finally {
      setEdit(false);
    }
  };

  return (
    <>
      <Container className='w-50 mt-5'>
        <Card style={{backgroundColor: '#eef3f9'}} className='w-100'>
          <Card.Header className='d-flex justify-content-between' style={{backgroundColor: '#b3cde4'}}>
            <div className='my-auto ms-1 fs-5'>Edit Profile</div>
            <Button id='closeEditBtn' className='rounded-circle text-black' style={{backgroundColor: '#b3cde4', borderColor: '#b3cde4'}} onClick={() => setEdit(false)}>X</Button>
          </Card.Header>
          <Card.Body style={{backgroundColor: '#eef3f9'}}>
            <Form className='my-2'>
              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Bio:</Form.Label>
                <Form.Control id='bio' type='text' value={bioText} onChange={(e) => setBioText(e.target.value)} />
              </Form.Group>

              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Favorite Genre:</Form.Label>
                <Form.Control id='genre' type='text' value={genreText} onChange={(e) => setGenreText(e.target.value)} />
              </Form.Group>

              <Form.Group className='w-75 mx-auto'>
                <Form.Label>Occupation:</Form.Label>
                <Form.Control id='occupation' type='text' value={occupationText} onChange={(e) => setOccupationText(e.target.value)} />
              </Form.Group>
            </Form>
          </Card.Body>
          <Button className='w-50 mx-auto mb-4' style={{backgroundColor: '#537692'}} onClick={updateProfile}>Save Changes</Button>
        </Card>
      </Container>
    </>
  );
};

export default EditProfile;