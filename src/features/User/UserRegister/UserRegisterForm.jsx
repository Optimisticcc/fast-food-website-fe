import React from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccount from "components/Aside/AsideAcountOutside";
import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import * as Yup from "yup";

UserRegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

UserRegisterForm.defaultProps = {
  onSubmit: null,
  initialValues: {
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    repassword: "",
    dateOfBirth: "",
  },
};

function UserRegisterForm(props) {
  const { onSubmit, initialValues } = props;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
    email: Yup.string()
      .email()
      .required("This field is required")
      .matches(/^\S+@\S+\.\S+$/),
    phoneNumber: Yup.string()
      .required("This field is required")
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    password: Yup.string().required("This field is required").min(6),
    repassword: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    dateOfBirth: Yup.date().required("This field is required"),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        return (
          <Form className="user-register">
            <div className="container">
              <BreadCrumb currentPage="Register" lastPage="My account" />
            </div>

            <div className="container">
              <div className="row">
                <aside id="column-left" className="col-sm-3">
                  <AsideAccount />
                </aside>

                <div id="content" className="col-sm-9">
                  <div className="row">
                    <div className="well">
                      <h2>Register</h2>
                      <p>
                        If you already have an account with us, please login at
                        the{" "}
                        <Link to="/account/login">
                          <a>login page</a>
                        </Link>
                        .
                      </p>
                      <div className="form-horizontal">
                        <fieldset id="account">
                          <legend>Your Personal Details</legend>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="name"
                              placeholder="Name"
                              id="input-name"
                              label="Name"
                              breakDown
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="text"
                              name="address"
                              placeholder="Address"
                              id="input-address"
                              label="Address"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="email"
                              name="email"
                              placeholder="E-Mail"
                              id="input-email"
                              label="E-mail"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="tel"
                              name="phoneNumber"
                              placeholder="Telephone"
                              id="input-telephone"
                              label="Telephone"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="date"
                              name="dateOfBirth"
                              placeholder="Date of birth"
                              id="input-dob"
                              label="Date of birth"
                            />
                          </div>
                        </fieldset>
                        <fieldset>
                          <legend>Your Password</legend>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="password"
                              name="password"
                              value=""
                              placeholder="Password"
                              id="input-password"
                              label="Password"
                            />
                          </div>
                          <div className="form-group required">
                            <FastField
                              component={InputField}
                              type="password"
                              name="repassword"
                              value=""
                              placeholder="Confirm Password"
                              id="input-confirm"
                              label="Confirm Password"
                            />
                          </div>
                        </fieldset>

                        <div className="buttons">
                          <div className="centered">
                            <button
                              type="submit"
                              className="btn btn-primary flex"
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
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default UserRegisterForm;
