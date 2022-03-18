import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Aside from "components/Aside";
import { FastField, Form, Formik } from "formik";
import InputField from "components/InputField";
import * as Yup from "yup";
import { formatCurrency } from "app/format";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createOrd, setMessage } from "features/CheckOut/checkoutSlice";
import { useHistory } from "react-router";
import momo from "../../../../assets/images/momo.png";
import cod from "../../../../assets/images/cod.png";
import { me } from "api/userApi";
import { createOrder, checkDiscount } from "api/orderApi";
CheckoutForm.propTypes = {};

function CheckoutForm(props) {
  const [initialValues, setInitialValues] = useState({
    email: "",
    address: "",
    phoneNumber: "",
  });
  const history = useHistory();
  const [cartProduct, setCartProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.checkout.loading);
  const [payment, setPayment] = useState("cod");
  const token = useSelector((state) => state.me.token);
  const user = useSelector((state) => state.me.user);
  const [code, setCode] = useState("");
  const [load, setLoad] = useState(false);
  const [display, setDisplay] = useState(false);
  const [text, setText] = useState("");
  const [idDiscount, setIdDiscount] = useState(1);
  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartProduct(JSON.parse(localStorage.getItem("cartItems")));
    }
  }, []);
  useEffect(() => {
    async function fectchAPI() {
      const actionMe = await me().then((data) => {
        setInitialValues({
          address: data && data.address && data.address,
          email: data && data.email && data.email,
          phoneNumber: data && data.phoneNumber && data.phoneNumber,
        });
      });
    }
    fectchAPI();
    const total = cartProduct
      .map((p) => p.price * p.cartQuantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);
    setTotal(total);
  }, [cartProduct]);
  const validateSchema = Yup.object().shape({
    address: Yup.string().required(),
    // discount: Yup.string(),
    email: Yup.string().required().email(),
    phoneNumber: Yup.string()
      .required()
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g),
  });
  const handlePayment = (value) => {
    setPayment(value);
  };
  const onSubmit = async (values) => {
    console.log("🚀 ~ file: index.jsx ~ line 71 ~ onSubmit ~ values", values);
    console.log("Total ", total);
    setLoad(true);
    let payUrl = "";
    const items = cartProduct.map((p) => ({
      product: p.id,
      quantity: p.cartQuantity,
    }));
    console.log("🚀 ~ file: index.jsx ~ line 79 ~ items ~ items", items);
    const finalData = {
      items: items,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      customerId: user.id,
      orderStatus: 0,
      paymentType: payment,
      paymentStatus: 0,
      total: total,
      discountId: idDiscount,
    };
    console.log(
      "🚀 ~ file: index.jsx ~ line 94 ~ onSubmit ~ finalData",
      finalData
    );
    const action = await createOrder(finalData)
      .then((res) => {
        payUrl = res.data.payUrl;
        setMessage("");
      })
      .catch((err) => setMessage(err.response.data.message));
    setTimeout(() => {
      if (payUrl !== "" && finalData.paymentType === "momo") {
        window.location.replace(payUrl);
      } else {
        history.push("/checkout/confirm");
      }
      setLoad(false);
    }, 2000);
  };
  const checkDiscountFunction = async () => {
    const now = new Date()
    let check;
    if (code) {
      try{
        check = await checkDiscount(code);
      }catch(err){

      }
    }
    if(check && check.data) {
      if(Date.parse(check.data.startDate) > Date.parse(now))
      {
        setText("Chưa đến thời điểm code được sử dụng")
      }
      else if(Date.parse(check.data.expirationDate) < Date.parse(now)) {
        setText("Hết thời điểm code được sử dụng")
      }
      else if(!check.data.isActive) {
        setText("Code đã bị vô hiệu hóa")
      }
      else if(check.data.discountPercent == 0) {
        setText("Code không có tỉ lệ giảm giá")
      }
      else{
        setText("Áp dụng code thành công bạn được giảm giá " + check.data.discountPercent + " phần trăm")
        setTotal(total * (100 - check.data.discountPercent) / 100)
        setIdDiscount(check.data.id)
      }
    }else {
      setText("Code bạn nhập không đúng")
    }
    setDisplay(true);
  };
  const discountChange = (e) => {
    setCode(e.target.value);
  };
  return (
    <div>
      {token != "" || cartProduct.length < 1 ? (
        <div>
          {load && (
            <div className="h-screen w-screen z-50 bg-gray-400 opacity-50 text-white flex justify-center items-center fixed top-0 left-0">
              <div className="flex flex-col items-center text-lg">
                <i class="fas fa-sync fa-spin"></i>
                <p>Đang xử lý</p>
              </div>
            </div>
          )}
          <div className="w-full border bg-white border-dashed border-gray-300 px-6 py-3 mb-4 text-xl uppercase">
            Form checkout
          </div>
          <div className="w-full border bg-white border-dashed border-gray-300 pt-12">
            <Formik
              validationSchema={validateSchema}
              onSubmit={onSubmit}
              initialValues={initialValues}
              enableReinitialize
            >
              {(formikProps) => {
                // do something here
                const { values, errors, touched, isSubmitting } = formikProps;
                return (
                  <Form className="flex justify-center flex-col items-start space-y-1">
                    <FastField
                      name="address"
                      component={InputField}
                      label="Address(*)"
                      placeholder="Address"
                    />
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email(*)"
                      placeholder="Email"
                    />
                    <FastField
                      name="phoneNumber"
                      component={InputField}
                      label="Phone(*)"
                      placeholder="Phone"
                    />
                    <div className="grid grid-cols-12 pl-12 w-full">
                      <div className="col-span-1 flex items-center">
                        Discount
                      </div>
                      <input
                        className={`border-2 col-start-3 col-span-7 border-gray-500 border-dotted rounded-full py-2 px-3 outline-none`}
                        value={code}
                        onChange={discountChange}
                      />
                      <span
                        className="btn-yellow col-span-2 ml-3 cursor-pointer flex justify-center items-center"
                        onClick={() => checkDiscountFunction()}
                      >
                        Apply
                      </span>
                    </div>
                    <div className="w-full ml-12 mt-2">
                      <span className="w-10/12 float-right">{text}</span>
                    </div>
                    <div className="w-full">
                      <section className="py-1 bg-blueGray-50">
                        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                            <div className="rounded-t mb-0 px-4 py-3 border-0">
                              <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full flex-grow flex-1">
                                  <h3 className="font-semibold text-base text-blueGray-700">
                                    List product
                                  </h3>
                                </div>
                              </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                              <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                  <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Image
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Name product
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Price
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Quantity
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                      Total
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {cartProduct &&
                                    cartProduct.length &&
                                    cartProduct.map((item, index) => (
                                      <tr key={index}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                          <img
                                            src={item.images[0].source}
                                            style={{ width: "100px" }}
                                          />
                                        </th>
                                        <td className="capitalize-first border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                          {item.name}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {formatCurrency(item.price)}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {item.cartQuantity}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          {formatCurrency(
                                            item.cartQuantity * item.price
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="text-right uppercase font-bold mr-14 mb-4">
                              Total: {formatCurrency(total)}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    {/* <div className="w-full">
                    <FastField
                      name="discount"
                      component={InputField}
                      label="Discount"
                      placeholder="Discount Code"
                    />
                    </div> */}
                    <div className="w-full">
                      <div
                        className={`flex space-x-2 items-center border border-dashed px-12 mx-5 mb-4 rounded-xl cursor-pointer ${
                          payment == "cod" &&
                          "shadow-lg bg-gray-200 text-gray-900"
                        }`}
                        onClick={() => handlePayment("cod")}
                      >
                        <img
                          src={cod}
                          alt="cod"
                          className="w-20 h-20 object-cover"
                        />
                        <p>
                          Đối với phương thức này bạn sẽ thanh toán khi nhận
                          hàng
                        </p>
                      </div>
                      <div
                        className={`flex space-x-2 items-center border border-dashed px-14 py-4 mx-5 mb-4 rounded-xl cursor-pointer ${
                          payment == "momo" &&
                          "shadow-lg bg-gray-200 text-gray-900"
                        }`}
                        onClick={() => handlePayment("momo")}
                      >
                        <img
                          src={momo}
                          alt="momo"
                          className="w-12 h-12 object-cover"
                        />
                        <p>
                          Đối với phương thức này bạn sẽ thanh toán qua ứng dụng
                          momo
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center w-full pb-4">
                      <button
                        className="btn-yellow flex items-center"
                        type="submit"
                      >
                        {isSubmitting && (
                          <svg
                            className="animate-spin h-4 w-4 text-white mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx={12}
                              cy={12}
                              r={10}
                              stroke="currentColor"
                              strokeWidth={4}
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        )}
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      ) : (
        <div className="w-full border bg-white border-dashed border-gray-300 h-96 flex justify-center items-center text-3xl px-16">
          Vui lòng đăng nhập và thêm sản phẩm vào giỏ trước khi đặt hàng
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
