import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { informationActions } from "../store";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Carousel = () => {
  const [bannerData, setBannerData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(informationActions.getBanner());
        setBannerData(response.payload);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {bannerData ? (
        <OwlCarousel className="owl-theme" items="5" margin={30} stagePadding={50} autoHeight={true} autoplay={true} nav={true} dots={true} loop={true}>
          {bannerData.map((banner, index) => (
            <div key={index} className="item">
              <img src={banner.banner_image} alt={banner.banner_name || ""} />
            </div>
          ))}
        </OwlCarousel>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Carousel;
