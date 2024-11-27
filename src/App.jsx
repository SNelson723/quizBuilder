import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('https://opentdb.com/api_category.php');
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="game" element={<QuizGame categories={categories} />} />
      </Route>
    )
  );

  const handleLoginSuccess = async (credentialResponse) => {
    window.location.href = '/auth/google';
    console.log('Login Success:', credentialResponse);
    // Send the token to your server for verification
    try {
      const response = await axios.post('/auth/google', {
        id_token: credentialResponse.credential,
      });
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log('Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

// Root component to wrap the navbar and outlet
const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;