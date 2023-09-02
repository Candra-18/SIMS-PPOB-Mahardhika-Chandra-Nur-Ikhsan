import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { authActions } from "../store";

import { Alert } from "component/Alert";

import IlustrasiLogin from "../assets/Website Assets/Illustrasi Login.png";
import Logo from "../assets/Website Assets/Logo.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Routes, Route, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = ({ username, password }) => {
    dispatch(authActions.login({ username, password }));
    navigate("/")
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="mx-auto max-w-lg text-center">
              <a href="" className="flex items-center justify-center">
                <img src={Logo} className="h-8 mr-3" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SIMSPPOB</span>
              </a>
              <p className="mt-8 text-2xl font-bold text-black text-center">Masuk atau buat akun</p>
              <p className=" text-2xl font-bold text-black text-center">untuk memulai</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md  mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" type="text" name="username" {...register("username")} placeholder="Email Address" />
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0"
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    {...register("password")}
                    placeholder="Password"
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                  <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </div>
              <Alert />
              <div className="mb-6 text-center">
                <button disabled={isSubmitting} className="mb-6 text-center w-full px-4 py-2 font-bold text-white bg-red-500  hover:bg-red-500  focus:outline-none focus:shadow-outline">
                  Masuk
                </button>
              </div>

              <div className=" text-sm font-display font-semibold text-gray-700 text-center">
                belum punya akun ? registrasi{" "}
                <a className="cursor-pointer text-red-600 hover:text-red-800" href="/Registrasi">
                  di sini
                </a>
              </div>
            </form>
          </div>
          <img src={IlustrasiLogin} alt="" className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
