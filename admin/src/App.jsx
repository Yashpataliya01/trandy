import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Lazy-loaded components
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import Navbar from "./components/navigation/Navbar.jsx";
import Products from "./pages/products/Products.jsx";
import Users from "./pages/users/Users.jsx";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {!isLogin || isLogin === null ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
