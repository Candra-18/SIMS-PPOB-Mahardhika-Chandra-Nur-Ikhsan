import React, { useEffect, useState } from "react";
import ProfilePhoto from "../assets/Website Assets/Profile Photo.png";
import Background from "../assets/Website Assets/Background Saldo.png";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../store";

const Hero = () => {
  const users = useSelector((state) => state.users.item);
  const balance = useSelector((state) => state.users.value);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getById());
    dispatch(userActions.getBalance());
  }, [dispatch]);

  const toggleShowBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex">
        <div className="max-w-sm p-9 mt-10">
          {users && users.value && users.value.data ? (
            <>
              <img src={users.value.data.profile_image !== "https://minio.nutech-integrasi.app/take-home-test/null" ? users.value.data.profile_image : ProfilePhoto} className="mr-3 w-40 h-40  rounded-full" alt="Profile Photo" />
              <a href="">
                <h5 className="mt-4 text-xl font-medium text-gray-900">Selamat Datang ,</h5>
              </a>
              <p className="mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{users.value.data.first_name + " " + users.value.data.last_name}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="h-auto max-w-full rounded-lg mt-10">
        <div className="relative">
          <div className="absolute w-full h-full ml-4">
            <h5 className="mt-5 text-2xl font-normal tracking-tight text-white dark:text-white">Saldo Anda</h5>
            {showBalance ? (
              <h5 className="mt-4 ml-2 text-3xl font-bold tracking-tight text-white dark:text-white">Rp. {balance.value}</h5>
            ) : (
              <h5 className="mt-4 ml-2 text-3xl font-bold tracking-tight text-white dark:text-white ">Rp. *********</h5>
            )}
            <button type="button" className="mt-5 ml-2 text-sm font-normal tracking-tight text-white dark:text-white" onClick={toggleShowBalance}>
              {showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}
            </button>
          </div>
          <img className="" src={Background} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
