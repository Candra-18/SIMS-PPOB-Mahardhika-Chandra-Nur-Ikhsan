import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { informationActions } from "../store";

const Menu = () => {
  const [serviceData, SetserviceData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(informationActions.getServices());
        SetserviceData(response.payload);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {serviceData ? (
        <div className="grid grid-cols-12 gap-4 ml-10 mt-10 ">
          {serviceData.map((service, index) => (
            <div className="col-span-1 p-4 flex flex-col items-center  m-o" key={index}>
              <Link to={`/Pembayaran?img=${service.service_icon}&name=${service.service_name}&code=${service.service_code}`}>
                <div className="justify-center ">
                  <img src={service.service_icon} alt={service.service_code} className="w-16 h-16 mx-auto" />
                  <div className="text-center text-sm mt-2  z-10 p-0 m-0 ">{service.service_name}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Menu;
