// import { useState } from 'react'
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Outlet } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        {/* <Route path="designs" element={<Designs designs={designs} />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} /> */}
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
