// Profile.jsx
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Profile = () => {
  const user = useLoaderData();
  console.log(user[0]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user[0].firstName} {user[0].lastName}</p>
      <p>Email: {user[0].email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Profile;