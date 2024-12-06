// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { MdModeEdit } from "react-icons/md";
import EditProfile from './EditProfile';
import axios from 'axios';

const Profile = () => {
  const [bio, setBio] = useState('');
  const [favoriteGenre, setFavoriteGenre] = useState('');
  const [occupation, setOccupation] = useState('');
  const [edit, setEdit] = useState(false);

  const user = useLoaderData();
  const { userName, image_url, userId } = user;
  // console.log(user);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(`/profile/${userId}`)
      console.log(data);
      setBio(data.bio);
      setFavoriteGenre(data.favoriteGenre);
      setOccupation(data.occupation);
    };
    getProfile();
  }, [userId, bio, favoriteGenre, occupation]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        {/* Profile Header */}
        <div id='header' className='border-bottom border-dark pb-4 d-flex justify-content-between align-items-end' style={{width: '100%'}}>
          <div className='d-flex mt-4' style={{width: '35vw'}}>
            <img src={image_url} style={{borderRadius: '10px', border: '3px solid grey', width: '9rem'}} />
            <div className='ms-4 mt-3'>
              <p id='profileName'>{userName}</p>
              <h6 style={{color: 'grey'}}>0 Friends</h6>
            </div>
          </div>
          <div>
            <Button className='text-black' variant='secondary' style={{backgroundColor: 'lightgray', fontWeight: '500'}} onClick={() => setEdit(true)}>
              <MdModeEdit /> Edit profile
            </Button>
          </div>
        </div>

        {/* Profile Body */}
        {!edit
          ?
          <div style={{backgroundColor: 'gray'}}>
            <Card bg='white' className='w-25 p-2' style={{backgroundColor: 'white'}}>
              <Card.Title>About</Card.Title>
              {/* <Button onClick={handleClick}>Add Bio</Button> */}
              <Card.Body>
                <ListGroup>
                  {/* Add bio stuff here =>text bio by user, location, favorite genre!!, occupation */}
                  {/* Move bio to the right of this, but first render a Add Bio button if there is no bio? */}
                  {/* <ListGroup.Item>Bio <span>Howdy</span></ListGroup.Item> */}
                  <ListGroup.Item>Bio: {bio}</ListGroup.Item>
                  <ListGroup.Item>Favorite Genre: {favoriteGenre}</ListGroup.Item>
                  <ListGroup.Item>Occupation: {occupation}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

          </div>
          : <EditProfile
              userId={userId}
              setBio={setBio}
              setFavoriteGenre={setFavoriteGenre}
              setOccupation={setOccupation}
              setEdit={setEdit}
            />
        }
      </Container>
    </>
  );
};

export default Profile;