import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet, useLoaderData } from "react-router-dom";
import axios from 'axios';
import Login from './Login';

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get('https://opentdb.com/api_category.php');
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const getUserLoader = async () => {
    try {
      const response = await axios.get('/api/current-user');
      return response.data;
    } catch (err) {
      console.error(err);
      throw (err);
    }
  };
  // need loader to pass to private routes to check if user is logged in
  const isLoggedInLoader = async () => {
    try {
      // send a get req to the isLoggedIn endpoint
      const response = await axios.get('/api/isLoggedIn');
      // console.log('logged in loader', response.data);
      // return the response data which is a boolean
      return response.data;
      // catch error handling
    } catch (err) {
      console.error(err);
      throw (err);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} loader={getUserLoader} />
        <Route path="game" element={<QuizGame categories={categories} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
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