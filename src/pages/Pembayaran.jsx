import React, { useState } from "react";
import { MoneyOutlined } from "@mui/icons-material";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Pembelian from "../component/modal/pembelian/Pembelian";
import { useLocation } from "react-router-dom";
import PembelianBerhasil from "../component/modal/pembelian/PembelianBerhasil";
import PembelianGagal from "../component/modal/pembelian/PembelianGagal";
import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../store";

const Pembayaran = () => {
  const [isModalVisibleTrue, setModalVisibleTrue] = useState(false);
  const [isModalVisibleFalse, setModalVisibleFalse] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const code = searchParams.get("code");
  const img = searchParams.get("img");
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalHandleLanjut = () => {
    if (amount.length > 0) {
      dispatch(transactionActions.payment(code))
        .then((response) => {
          console.log(response);
          if (response.payload === 200) {
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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      {console.log(name, code, img)}
      <Navbar />
      <Hero />
      <div className="max-w-sm p-9 ">
        <h5 className="mt-4 text-xl font-medium text-gray-950 ">Pembayaran</h5>

        <a href="" className="flex items-center mt-4">
          <img src={img} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-xl font-normal ml-4 whitespace-nowrap dark:text-white">{name}</span>
        </a>
      </div>

      <div className="w-full p-4 text-center sm:p-8 ">
        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4 ">
          <MoneyOutlined />
          <input className="pl-2 outline-none border-none w-full focus:border-transparent focus:ring-0" type="number" name="amount" id="amount" placeholder="10000" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="mb-6 text-center">
          <button  disabled={!amount} onClick={toggleModal} className="w-full px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:shadow-outline">
            Bayar
          </button>
        </div>
        <Pembelian isVisible={isModalVisible} toggleModal={toggleModal} toggleModalHandleLanjut={toggleModalHandleLanjut} amount={amount} name={name} />
        <PembelianBerhasil isVisible={isModalVisibleTrue} amount={amount} name={name} />
        <PembelianGagal isVisible={isModalVisibleFalse} amount={amount} name={name} />
      </div>
    </>
  );
};

export default Pembayaran;
