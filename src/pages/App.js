import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Registrasi from "./Registrasi";
import Akun from "./Akun";
import Pembayaran from "./Pembayaran";
import TopUp from "./TopUp";
import EditProfile from "./EditProfile";
import Transaction from "./Transaction";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";
import { history } from "services";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registrasi" element={<Registrasi />} />
        <Route path="/Akun" element={<Akun />} />
        <Route path="/TopUp" element={<TopUp />} />
        <Route path="/Pembayaran" element={<Pembayaran />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/EditProfile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
