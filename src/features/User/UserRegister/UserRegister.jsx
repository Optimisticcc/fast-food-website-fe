import React from "react";
import PropTypes from "prop-types";
import UserRegisterForm from "./UserRegisterForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "api/userApi";
import { store } from "react-notifications-component";

UserRegister.propTypes = {};

function UserRegister() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
    dateOfBirth: "",
  };
  const handleSubmit = async (values) => {
    console.log(
      "🚀 ~ file: UserRegister.jsx ~ line 24 ~ handleSubmit ~ values",
      values
    );
    delete values.repassword;
    const action = await saveUser({
      ...values,
      dateOfBirth: values.dateOfBirth,
      id: 0,
      status: true,
    })
      .then((data) => {
        store.addNotification({
          title: "Wonderful!",
          message: "Register successfully",
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
        history.push("/account");
      })
      .catch((err) =>
        store.addNotification({
          title: "Oops!",
          message: "Register failed \n" + err.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: false,
          },
        })
      );
  };
  return (
    <>
      <UserRegisterForm onSubmit={handleSubmit} initialValues={initialValues} />
    </>
  );
}

export default UserRegister;
