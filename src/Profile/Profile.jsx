// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';
import { MdModeEdit } from "react-icons/md";

const Profile = () => {
  const user = useLoaderData();
  const { userName, image_url, } = user[0];
  // console.log(user[0]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
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
            <Button className='text-black' variant='secondary' style={{backgroundColor: 'lightgray', fontWeight: '500'}}>
              <MdModeEdit /> Edit profile
            </Button>
          </div>
        </div>

        {/* Profile Body */}
        <div style={{backgroundColor: 'gray'}}>
          <Card bg='white' className='w-25 p-2' style={{backgroundColor: 'white'}}>
            <Card.Title>About</Card.Title>
            <Button>Add Bio</Button>
            <Card.Body>
              <ListGroup>
                {/* Add bio stuff here =>text bio by user, location, favorite genre!!, occupation */}
              </ListGroup>
            </Card.Body>
          </Card>

        </div>
      </Container>
    </>
  );
};

export default Profile;