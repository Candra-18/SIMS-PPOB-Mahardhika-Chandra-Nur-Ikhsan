import React from "react";
import Logo from "../../../assets/Website Assets/Logo.png"

const TopUpAmount = ({ isVisible, amount, toggleModalTopUP, handleTopUp }) => {
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

              <h4 className="mb-3 text-lg  text-black font-bold dark:text-gray-400">anda yakin untuk Top Up sebesar</h4>
              <h2 className="mb-3 text-lg  text-black font-bold dark:text-gray-400">Rp. {amount}?</h2>

              <button
                onClick={() => toggleModalTopUP()}
                type="button"
                className="text-red-500 bg-white w-full focus:ring-4 focus:outline-none text-sm font-medium px-5 py-2.5 hover:text-red-500 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Ya,Lanjutkan Top Up
              </button>
              <button
                onClick={() => handleTopUp()}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 w-full focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TopUpAmount;
