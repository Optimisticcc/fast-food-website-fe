import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import crypto from "crypto";
import { HmacSHA256 } from "crypto-js";
import { useLocation } from "react-router-dom";
import successImg from "../../../../assets/images/success-icon.png";
import failImg from "../../../../assets/images/fail.png";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCart } from "features/Cart/cartSlice";
Confirm.propTypes = {};

function Confirm(props) {
  const search = useLocation().search;
  const [status, setStatus] = useState(false);
  const [momo, setMomo] = useState(false);
  const message = useSelector(state => state.checkout.message)
  const [isSuccess,setIsSuccess] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    localStorage.removeItem("cartItems")
    const action = removeAllCart();
    dispatch(action)
    const params = new URLSearchParams(search);
    if (params.get("partnerCode")) {
      setMomo(true);
      const partnerCode = params.get("partnerCode");
      const requestType = "captureWallet";
      const orderId = params.get("orderId");
      const amount = params.get("amount");
      const orderInfo = params.get("orderInfo");
      const requestId = params.get("requestId");
      const extraData = params.get("extraData");
      const orderType = "momo_wallet";
      const accessKey = process.env.REACT_APP_ACCESS_KEY;
      const secretkey = process.env.REACT_APP_SECRET_KEY;
      const message = params.get("message");
      const resultCode = params.get("resultCode");
      const payType = params.get("payType");
      const transId = params.get("transId");
      const responseTime = params.get("responseTime");
      const signatureReceive = params.get("signature");
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
      const signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");
      const sigHmac = HmacSHA256(rawSignature, secretkey).toString();
      if (signatureReceive === signature && resultCode == 0) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }else{
      if(message != "")
      { 
        setIsSuccess(false)
      }
    }
  }, []);
  return (
    <div>
      <div className="w-full border bg-white border-dashed border-gray-300 px-6 py-3 mb-4 text-xl uppercase">
        Thank you for trusting us
      </div>
      <div className="w-full border bg-white border-dashed border-gray-300 pt-12">
        <div className="flex justify-center pb-8">
          <img src={isSuccess ? successImg : failImg} className="w-56 h-56 object-cover" alt="" />
        </div>
        <p className="text-center px-12 mb-6 text-base">
          {isSuccess ? "Đơn đặt hàng của bạn đã được xử lý thành công!" : "Đơn hàng của bạn đã xử lý thât bại!"} <br /> <br /> {isSuccess ? "Bạn có thể xem lịch sử đặt hàng của mình bằng cách truy cập tài khoản của tôi và nhấp vào lịch sử" : `Lý do chúng tôi tìm hiểu được là: ${message == undefined ? "Unknow" : message}`}<br /> <br />
          {momo ? (
            <p>
              `Theo như thông tin hiện tại của đơn hàng bạn đã chọn phương thức
              thanh toán momo và tình trạng thanh toán hiện tại là :{" "}
              {status ? (
                <span className="text-green-600">Đã thanh toán</span>
              ) : (
                <span className="text-red-600">Chưa hoàn thành</span>
              )}
            </p>
          ) : (
            `Theo như thông tin hiện tại của đơn hàng bạn đã chọn phương thức
        thanh toán cod. ${isSuccess ? 'Vui lòng để ý điện thoại để shipper có thể kết nối với bạn' : 'Nhưng đã có vấn đề xảy ra rất xin lỗi quý khách'}`
          )}
          <br />
          Vui lòng chuyển bất kỳ câu hỏi nào bạn có cho chúng tôi thông qua
          email hoặc số điện thoại. Cảm ơn vì đã mua sắm trực tuyến với chúng
          tôi
        </p>
        <div className="flex justify-end">
          <a href="/products" className="flex items-center space-x-2 mr-5 my-4 btn-yellow">
            <span>Go to products</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
