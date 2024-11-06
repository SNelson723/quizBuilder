// import { useState } from 'react'
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import QuizGame from './QuizGame/QuizGame.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="game" element={<QuizGame />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

// Root component to wrap the navbar and outlet
const Root = () => {
  return (
    <>
      <div className='d-flex'>
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

export default App