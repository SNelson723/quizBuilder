import { useState, useEffect } from 'react';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";
import axios from 'axios'

const App = () => {
  const [categories, setCategories] = useState([]);

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

export default App