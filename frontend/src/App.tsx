import { useState } from "react";
import "./App.css";
import NavBar from "./components/Navigation/NavBar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ListProperties from "./pages/ListProperties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import RequireAuth from "./utils/RequireAuth";
import Error from "./pages/404";
import HotelPage from "./pages/HotelPage";

function App() {
  const nav = useNavigate();
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/add-property" element={<ListProperties />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
