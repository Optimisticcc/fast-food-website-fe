import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Slide } from "react-slideshow-image";
// import Images from '../../constants/images.js'
import SlideBanner from "../Button/SliceBanner.jsx";
//import Images from 'constants/images.js';
import MainBanner1 from "../../assets/images/main-banner1-1920x800.jpg";
import MainBanner2 from "../../assets/images/main-banner2-1920x800.jpg";
import { AllSetting, getSettingById, getSettingFilter } from "api/settingApi";
Banner.propTypes = {
  listBanner: PropTypes.func,
};
Banner.defaultProps = {
  listBanner: [],
};

const images = [
  {
    src: MainBanner1,
  },
  {
    src: MainBanner2,
  },
];

function Banner(props) {
  const slideRef = useRef();
  const properties = {
    arrows: false,
    transitionDuration: 300,
  };
  const pre = () => {
    slideRef.current.goBack();
  };
  const next = () => {
    slideRef.current.goNext();
  };



  return (
    <div className="relative">
      <div>
        <SlideBanner right={true} onClickArrow={pre} />
        <SlideBanner right={false} onClickArrow={next} />
        <Slide ref={slideRef} {...properties}>
          {images.map((img, index) => (
            <div className="each-slide" key={index}>
              <img src={img?.src} alt="" className="selector" />
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Banner;
