import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";
import Navbar from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../assets/Website Assets/Profile Photo.png";

const EditProfile = () => {
  const users = useSelector((state) => state.users.item);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [valueImage, setValueImage] = useState(null);

  useEffect(() => {
    dispatch(userActions.getById());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.value && users.value.data) {
      setFormData({
        email: users.value.data.email,
        first_name: users.value.data.first_name,
        last_name: users.value.data.last_name,
      });
      setValueImage(users.value.data.profile_image);
    }
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(userActions.updateProfile(formData));
      if (response.payload == 200) {
        alert("Berhasil Edit Profile");
        return navigate("/Akun");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeFile = async (e) => {
    const file = e.target.files[0];
    setValueImage(URL.createObjectURL(file));
    if (file) {
      if (file.size <= 100 * 1024) {
        const response = await dispatch(userActions.updateImages(file));
        setValueImage(response.payload.data.profile_image);
      } else {
        alert("Gambar Harus Dibawah 100kb");
      }
    }
  };

  function handleClickProfilePicture() {
    profilePictureInput.current.click();
  }
  const profilePictureInput = useRef(null);
  return (
    <>
      <Navbar />
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        {users && users.value && users.value.data ? (
          <>
            <input hidden ref={profilePictureInput} type="file" onChange={handleChangeFile} accept="image/x-png,image/gif,image/jpeg" />
            <div>
              {users.value.data === null ? (
                <div
                  className="profile-picture-default"
                  src={"https://media.istockphoto.com/id/1317323736/id/foto/pemandangan-ke-langit-arah-pepohonan.jpg?s=2048x2048&w=is&k=20&c=RQmMUg2akvQmIp3yzUmDP7FQmnwrRolFO3eap0pIuKM="}
                  alt="profile picture"
                  onClick={handleClickProfilePicture}
                />
              ) : (
                <div className="flex items-center justify-center">
                  <img
                    src={users.value.data.profile_image !== "https://minio.nutech-integrasi.app/take-home-test/null" ? valueImage: ProfilePhoto}
                    className="w-40 h-40  rounded-full mr-3"
                    alt="Flowbite Logo"
                    onClick={handleClickProfilePicture}
                  />
                </div>
              )}
            </div>
            <p className="mt-5 mb-5 text-4xl font-bold text-black  dark:text-black">{users.value.data.first_name + " " + users.value.data.last_name}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Email
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-md  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" type="text" name="email" id="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
              </div>
            </div>

            <div className="">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Nama Depan
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-md  mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  className=" pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0"
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="nama depan"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-start text-gray-900 dark:text-white">
                Nama Belakang
              </label>
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <input
                  className=" pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0 "
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="nama belakang"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="mb-6 text-center">
            <button className="w-full px-4 py-2 font-semibold text-white bg-red-500  hover:bg-red-500  focus:outline-none focus:shadow-outline" type="submit">
              Simpan
            </button>
          </div>
          <div className="mb-6 text-center">
            <a href="/Akun">
              <div className="w-full px-4 py-2 font-semibold text-red-500 bg-white  border-2 focus:outline-none focus:shadow-outline">Batal</div>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
