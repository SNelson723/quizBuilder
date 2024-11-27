// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/current-user');
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Profile;