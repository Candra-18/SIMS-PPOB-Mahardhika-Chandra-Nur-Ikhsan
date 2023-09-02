import React from "react";

import Logo from "../../../assets/Website Assets/cross.png"

const TopUpGagal = ({ isVisible, amount, toggleModalTopUpFalse }) => {
  if (!isVisible) {
    return null;
  } else {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
            <img className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" src={Logo} alt="" />

              <h4 className="mb-2 text-lg text-black font-normal  dark:text-gray-400">Top Up sebesar</h4>
              <h2 className="mb-2 text-lg text-black font-bold  dark:text-gray-400">Rp. {amount}</h2>
              <p className="mb-2 text-lg text-black font-normal  dark:text-gray-400">Gagal</p>
              <p className="mb-2 text-lg text-black font-normal  dark:text-gray-400">Min Top Up Rp. 10.000 dan Max Top Up Rp. 1.000.000</p>
             <a  href="/"> 
              <button
               
                type="button"
                className="text-red-500 bg-white  dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Kembali ke Beranda
              </button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TopUpGagal;
