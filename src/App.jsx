import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import axios from 'axios';
import Login from './Login';
import PrivateRoutes from './PrivateRoutes';
import Profile from './Profile/Profile';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('https://opentdb.com/api_category.php');
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const isLoggedInLoader = async () => {
    try {
      const response = await axios.get('/api/isLoggedIn');
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getUserLoader = async () => {
    try {
      const response = await axios.get('/api/current-user');
      return response.data;
    } catch (err) {
      console.error(err);
      throw (err);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />} loader={isLoggedInLoader}>
          <Route path="/home" element={<Home />} loader={getUserLoader} />
          <Route path="/game" element={<QuizGame categories={categories} />} loader={getUserLoader} />
          <Route path="/profile" element={<Profile />} loader={getUserLoader}>
          </Route>
          <Route path="/auth/google" element={<RedirectToGoogle />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

// Component to redirect to Google OAuth
const RedirectToGoogle = () => {
  useEffect(() => {
    window.location.href = '/auth/google'; // Redirect to your Express auth endpoint
  }, []);

  return null; // Render nothing while redirecting
};

export default App;