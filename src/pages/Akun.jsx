import React, { useEffect, useState } from "react";
import ProfilePhoto from "../assets/Website Assets/Profile Photo.png";
import Navbar from "../component/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { userActions, authActions } from "../store";

const Akun = () => {
  const users = useSelector((state) => state.users.item);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(authActions.logOut());
  };

  useEffect(() => {
    dispatch(userActions.getById());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {users && users.value && users.value.data ? (
          <>
            <a href="" className="flex items-center justify-center">
              {console.log(users.value.data.profile_image)}
              <img src={users.value.data.profile_image !== "https://minio.nutech-integrasi.app/take-home-test/null" ? users.value.data.profile_image : ProfilePhoto} className="w-40 h-40  rounded-full mr-3" alt="Profile Photo" />
            </a>
            <p className="mt-5 mb-5 text-4xl font-bold text-black  dark:text-black">{users.value.data.first_name + " " + users.value.data.last_name}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="mb-4">
            <div className="">
              <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Email
              </label>

              <div className="flex items-center border-2 py-2 px-3 rounded-md  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" value={users?.value?.data?.email} type="text" name="" id="" placeholder="Email Address" />
              </div>
            </div>

            <div className="">
              <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Nama Depan
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-md  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input className=" pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" value={users?.value?.data?.first_name} type="text" name="" id="" placeholder="nama depan" />
              </div>
            </div>

            <div className="">
              <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Nama Belakang
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input className=" pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" value={users?.value?.data?.last_name} type="text" name="" id="" placeholder="nama belakang" />
              </div>
            </div>
          </div>
          <div className="mb-6 text-center">
            <a href="/EditProfile">
              <button className="w-full px-4 py-2 font-semibold text-white bg-red-500  hover:bg-red-500  focus:outline-none focus:shadow-outline" type="button">
                Edit Profile
              </button>
            </a>
          </div>
          <div className="mb-6 text-center">
            <button className="w-full px-4 py-2 font-semibold text-red-600 border-2 border-red-600 bg-white hover:text-white hover:bg-red-500  focus:outline-none focus:shadow-outline" type="button" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Akun;
