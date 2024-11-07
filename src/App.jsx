import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import axios from 'axios'

const App = () => {
  const [categories, setCategories] = useState([]);
  const queryLink = import.meta.env.VITE_TRIVIA_API;
  const api_key = import.meta.env.VITE_API_KEY;
  const baseUrl = queryLink + api_key;

  useEffect(() => {
    const fetchCategories = async () => {
      const {data} = await axios.get('https://opentdb.com/api_category.php');
      setCategories(data.trivia_categories);
    };
    fetchCategories();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="game" element={<QuizGame quizUrl={baseUrl} categories={categories} />} />
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

export default App