import React from "react";

import Logo from "../assets/Website Assets/Logo.png"
import Carousel from "./Carousel";


// import icons


const CardCarousel = () => {

  return (
<div className="w-full p-4 text-left mt-7">
  <h5 className="mb-2 text-2xl font-normal text-gray-900 dark:text-white">
    Temukan Promo Menarik
  </h5>
 
  <Carousel/>
</div>

  );
  

};

export default CardCarousel;
