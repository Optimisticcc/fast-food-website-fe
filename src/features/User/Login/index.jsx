import React from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccount from "components/Aside/AsideAcountOutside";
import { useDispatch, useSelector } from "react-redux";
import { getMe, loginSucces, loginThunk } from "./loginSlice";
import { useHistory } from "react-router-dom";
import InputField from "components/InputField";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";
import { login } from "api/userApi";
import { store } from 'react-notifications-component';

LoginForm.propTypes = {
  initialValues: PropTypes.object,
};
LoginForm.defaultProps = {
  initialValues: {
    email: "",
    password: "",
  },
};

function LoginForm(props) {
  const { initialValues } = props;

  const validateSchema = Yup.object().shape({
    email: Yup.string().required(),

    password: Yup.string().required(),
  });

  const token = useSelector((state) => state.me.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const action = await login(values)
      .then((resolve) => {
        const action = loginSucces(resolve);
        dispatch(action);
        history.push("/");
        store.addNotification({
          title: "Wonderful!",
          message: "Login successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
              duration: 5000,
              onScreen: false
          }
      })
      })
      .catch((error) => {
        store.addNotification({
          title: "Oops!",
          message: "Login failed, wrong password or email\n" + error.message,
          type: 'danger',
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
              duration: 5000,
              onScreen: false
          }
      })
      });
    const me = getMe();
    dispatch(me);
  };
  return (
    <div className="user-login">
      <div className="container">
        <BreadCrumb currentPage="Login" lastPage="My account" />
      </div>

      <div className="container">
        <div className="row">
          <aside id="column-left" className="col-sm-3">
            <AsideAccount />
          </aside>
          <div id="content" className="col-sm-9">
            <div className="row">
              <div className="well">
                <h2>Login</h2>
                <Formik
                  validationSchema={validateSchema}
                  initialValues={initialValues}
                  onSubmit={onFinish}
                >
                  {(formikProps) => {
                    const { values, errors, touched, isSubmitting } =
                      formikProps;
                    return (
                      <Form>
                        <FastField
                          name="email"
                          component={InputField}
                          label="E-Mail"
                          placeholder="abc@xyz.com"
                          breakDown={true}
                        />

                        <FastField
                          name="password"
                          component={InputField}
                          label="Password"
                          placeholder="******"
                          breakDown={true}
                          type="password"
                        />
                        <div className="centered">
                          <button className="btn btn-primary flex" type="submit">
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
                            Login
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
