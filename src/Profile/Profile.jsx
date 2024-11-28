// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

const Profile = () => {
  const user = useLoaderData();
  const { userName, image_url, } = user[0];
  // console.log(user[0]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <Container>
      <Card className='d-flex mt-4' style={{width: '35vw'}}>
        <img src={image_url} style={{borderRadius: '10px', border: '3px solid grey', width: '9rem'}} />
        <div className='ms-4 mt-3'>
          <p id='profileName'>{userName}</p>
          <h6 style={{color: 'grey'}}>0 Friends</h6>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;