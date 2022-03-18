import React, { useEffect, useState } from "react";
import UserInfoForm from "./UserInfoForm";
import { useDispatch, useSelector } from "react-redux";
import { me, saveUser } from "api/userApi";
import moment from "moment";
import { getMe, setToken } from "../Login/loginSlice";
import { store } from "react-notifications-component";

UserInfo.propTypes = {};

function UserInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.me.user);
  const [initialValues, setInitialValues] = useState({
    // name: user && user.name ? user.name : "",
    // address: user && user.address ? user.address : "",
    // email: user && user.email ? user.email : "",
    // phoneNumber: user && user.phoneNumber ? user.phoneNumber : "",
    // dateOfBirth: user && user.dateOfBirth ? moment(user.dateOfBirth).format('YYYY-MM-DD') : "",
  });
  const handleSubmit = async (values) => {
    console.log(
      "🚀 ~ file: UserInfo.jsx ~ line 22 ~ handleSubmit ~ values",
      values
    );
    // console.log({...values, password : user.password, dateOfBirth : Date.parse(values.dateOfBirth), _id : user._id, TrangThai : 1})
    const action = await saveUser({
      ...values,
      password: user.password,
      id: user.id,
    })
      .then((data) => {
        const actionToken = setToken(data.token);
        dispatch(actionToken);
        store.addNotification({
          title: "Wonderful!",
          message: "Update information successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
      })
      .catch((err) => {
        store.addNotification({
          title: "Oops!",
          message: "Update information failed\n" + err,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        });
      });
    const actionMe = getMe();
    await dispatch(actionMe);
  };
  useEffect(() => {
    async function fectchAPI() {
      const actionMe = await me().then((data) => {
        console.log(data, "data");
        setInitialValues({
          name: data && data.name ? data.name : "",
          address: data && data.address && data.address,
          email: data && data.email && data.email,
          phoneNumber: data && data.phoneNumber && data.phoneNumber,
          dateOfBirth:
            data &&
            data.dateOfBirth &&
            moment(data.dateOfBirth).format("YYYY-MM-DD"),
        });
      });
    }
    fectchAPI();
  }, []);
  return (
    <>
      <UserInfoForm onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
}

export default UserInfo;
