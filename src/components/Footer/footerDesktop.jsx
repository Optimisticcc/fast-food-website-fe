import React, { useEffect, useState } from "react";
import { AllSetting, getSettingById, getSettingFilter } from "api/settingApi";
import Momo from "../../assets/images/momo.png";
import Cod from "../../assets/images/cod.png";

function FooterDesktop() {
  const [phone, setphone] = useState({});
  const [address, setadress] = useState({});
  const [email, setemail] = useState({});
  useEffect(() => {
    const fetchSetting = async () => {
      const data = await getSettingFilter({
        name: "setting-phone",
        type: "string",
      });
      if (data && data.data) setphone(data.data[0]);
    };
    fetchSetting();
  }, []);
  useEffect(() => {
    const fetchSetting = async () => {
      const data1 = await getSettingFilter({
        name: "setting-address",
        type: "string",
      });
      if (data1 && data1.data) setadress(data1.data[0]);
    };
    fetchSetting();
  }, []);
  useEffect(() => {
    const fetchSetting = async () => {
      const data2 = await getSettingFilter({
        name: "setting-email",
        type: "string",
      });
      if (data2 && data2.data) setemail(data2.data[0]);
    };
    fetchSetting();
  }, []);

  return (
    <div
      className="flex bg-gray-800 px-6 lg:p-20 lg:space-x-6 justify-center flex-col lg:flex-row py-6"
      style={{ width: "100%" }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          className="flex flex-col text-white space-y-2 lg:space-y-4"
          style={{ marginBottom: "20px" }}
        >
          <div className="text-lg text-yellow-400">Contact</div>
          <div className="flex space-x-2 items-center">
            <i className="fas fa-paper-plane"></i>

            <p>{address && address.value ? address.value : ""}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <i className="fas fa-phone-alt"></i>
            <p>{phone && phone.value ? phone.value : ""}</p>
          </div>
          <div className="flex space-x-2 items-center">
            <i className="fas fa-envelope"></i>
            <p>{email && email.value ? email.value : ""}</p>
          </div>

          <div className="flex space-x-2">
            <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
              <i className="fab fa-youtube"></i>
            </div>
            <div className="bg-black hover:bg-yellow-400 w-10 h-10 flex items-center justify-center rounded-full">
              <i className="fab fa-pinterest"></i>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col text-white space-y-4"
          style={{ marginBottom: "20px" }}
        >
          <div className="text-lg text-yellow-400">Information</div>
          <div className="flex space-x-2 items-center">
            <p>About us</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p>Delivery Information</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p>Term and Condition</p>
          </div>
        </div>
        <div
          className="flex flex-col text-white space-y-4"
          style={{ marginBottom: "20px" }}
        >
          <div className="text-lg text-yellow-400">Service</div>
          <div className="flex space-x-2 items-center">
            <p>Brands</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p>Gift Certificates</p>
          </div>
          <div className="flex space-x-2 items-center">
            <p>Contact US</p>
          </div>
        </div>

        <div
          className="flex flex-col text-white space-y-4"
          style={{ marginBottom: "20px" }}
        >
          <div className="text-lg text-yellow-400">Payment</div>
          <div className="flex space-x-2 items-center">
            <img src={Momo} style={{ width: "40px", height: "40px" }} alt="#" />

            <img src={Cod} style={{ height: "80px" }} alt="#"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterDesktop;
