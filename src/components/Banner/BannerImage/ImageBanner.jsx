import React, { useEffect, useState } from "react";

import { AllSetting, getSettingById } from "api/settingApi";
import { Link } from "react-router-dom";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";

function ImageBanner() {
  return (
    <div className="md:grid py-6 grid-cols-2 lg:grid-flow-row items-center mx-auto xl:flex flex-row item-center justify-center ">
      <div className="  grid grid-cols-1  justify-center  overflow-hidden m-4">
                
                <img className="mx-auto transform hover:scale-105 transition-transform duration-1000" src={banner1}/>
                <div className="mx-3 my-2 md:mx-3 md:my-3 sm:mx-12 sm:my-4  absolute xl:mx-8  xl:my-14 2xl:mx-16 2xl:my-12 space-y-4">
                    <div className=" lg:text-xl text-white xl:text-2xl">{}</div>
                    <div>
                      <Link to="/products" className="blog-read btn bg-yellow-500" title="Read More">Oder Now</Link>
                    </div>
                </div>

            </div>
            <div className="  grid grid-cols-1  justify-center  overflow-hidden m-4">
                
                <img className="mx-auto transform hover:scale-105 transition-transform duration-1000" src={banner2}/>
                <div className="mx-3 my-2 md:mx-3 md:my-3 sm:mx-12 sm:my-4  absolute xl:mx-8  xl:my-14 2xl:mx-16 2xl:my-12 space-y-4">
                    <div className=" lg:text-xl text-white xl:text-2xl">{}</div>
                    <div>
                      <Link to="/products" className="blog-read btn bg-yellow-500" title="Read More">Oder Now</Link>
                    </div>
                </div>

            </div>
    </div>
  );
}

export default ImageBanner;
