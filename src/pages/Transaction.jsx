import React, { useState, useEffect } from "react";
import { MoneyOutlined } from "@mui/icons-material";
import Navbar from "../component/Navbar";
import Hero from "../component/Hero";

import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../store";

const Transaction = () => {
  const [historyData, setHistoryData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(transactionActions.history({ offset, limit }));
        console.log(response.payload.data.records);
        setHistoryData(response.payload.data.records);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [dispatch, offset, limit]);

  const handleShowMore = () => {
    setOffset(offset + limit);
    // setLimit(limit + 3);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <div className="max-w-sm p-9">
        <h5 className="mt-4 text-xl font-medium text-gray-950">Semua Transaksi</h5>
      </div>

      <ul className="max-w divide-y pl-6 divide-gray-200 dark:divide-gray-700">
        {historyData.map((record, index) => (
          <li key={index} className="pb-3">
            <div className="flex items-center">
              <div className="w-full bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-2xl mb-2 font-medium text-gray-900 truncate dark:text-white">{record.name}</p>
                    <div>
                      <ul className="font-medium   md:p-0 mt-4  ">
                        <li>
                          <p className={`text-xl  ${record.transaction_type === "PAYMENT" ? "text-red-500" : "text-green-500"} truncate dark:text-gray-400`}>
                            {` ${record.transaction_type === "PAYMENT" ? "-" : "+"} Rp. ` + record.total_amount.toLocaleString("id-ID")}
                          </p>
                        </li>
                        <li>
                          <p className="text-sm mt-3 p-0 m-0 text-gray-500 truncate dark:text-gray-400">{record.created_on}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{record.description}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center mb-10 mt-5">
        <button data-tooltip-target="tooltip-animation" type="button" className="text-red-500 text-sm items-center text-center font-bold" onClick={handleShowMore}>
          Show More
        </button>
      </div>
    </>
  );
};

export default Transaction;
