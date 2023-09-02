import React, { useState } from "react";
import { MoneyOutlined } from "@mui/icons-material";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../store";
import TopUpBerhasil from "../component/modal/topup/TopUpBerhasil";
import TopUpAmount from "../component/modal/topup/TopUp";
import TopUpGagal from "../component/modal/topup/TopUpGagal";

const TopUp = () => {
  const [amount, setAmount] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalVisibleTrue, setModalVisibleTrue] = useState(false);
  const [isModalVisibleFalse, setModalVisibleFalse] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleButtonSelect = (value) => {
    setAmount(value);
    setSelectedButton(value);
  };

  const toggleModalTopUP = () => {
    if (amount && !isNaN(amount) && amount >= 10000 && amount <= 1000000) {
      dispatch(transactionActions.postTopUp(amount))
        .then((response) => {
          if (response.payload === 200) {
            console.log("panggil Pop up");
            setModalVisible(false);
            setModalVisibleTrue(!isModalVisibleTrue);
          }
        })
        .catch((error) => {
          console.error(error);
          setModalVisible(false);
          setModalVisibleFalse(true);
        });
    } else {
      setModalVisible(false);
      setModalVisibleFalse(true);
    }
  };

  const handleTopUp = () => {
    setModalVisible(true);
  };

  const handleTopUpBatal = () => {
    setModalVisible(false);
  };

  const toggleModalTopUpFalse = () => {
    setModalVisibleFalse(false);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="max-w-sm p-9">
        <h5 className="mt-4 text-xl font-medium text-gray-950">Silahkan masukan</h5>
        <p className="mb-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Nominal Top Up</p>
      </div>

      <div className="ml-8">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
              <input className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" type="number" min="10000" max="1000000" placeholder="10000" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>

          <div className="ml-48">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "10000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("10000")}
            >
              Rp10.000
            </button>
          </div>
          <div className="ml-4">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "20000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("20000")}
            >
              Rp20.000
            </button>
          </div>
          <div className="-ml-40">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "50000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("50000")}
            >
              Rp50.000
            </button>
          </div>

          {/* Add similar button components for other amounts */}
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="mb-6 text-center">
              <button disabled={!amount} className="w-full px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:shadow-outline" type="button" onClick={handleTopUp}>
                Top Up
              </button>
            </div>
          </div>
          <div className="ml-48">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "100000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("100000")}
            >
              Rp100.000
            </button>
          </div>
          <div className="ml-4">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "250000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("250000")}
            >
              Rp250.000
            </button>
          </div>
          <div className="-ml-40">
            <button
              type="button"
              className={`py-2.5 px-7 mr-2 mb-2 text-sm font-medium ${
                selectedButton === "500000" ? "text-white bg-red-500" : "text-gray-900 bg-white"
              } focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200`}
              onClick={() => handleButtonSelect("500000")}
            >
              Rp500.000
            </button>
          </div>
        </div>
      </div>
      <TopUpBerhasil isVisible={isModalVisibleTrue} amount={amount} />
      <TopUpAmount isVisible={isModalVisible} amount={amount} toggleModalTopUP={toggleModalTopUP} handleTopUp={handleTopUpBatal} />
      <TopUpGagal isVisible={isModalVisibleFalse} amount={amount} toggleModalTopUpFalse={toggleModalTopUpFalse} />
    </>
  );
};

export default TopUp;
