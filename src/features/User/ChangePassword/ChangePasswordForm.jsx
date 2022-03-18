import React from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccountInside from "components/Aside/AsideAccountInside"
import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import * as Yup from 'yup';

ChangePasswordForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
};

ChangePasswordForm.defaultProps = {
    onSubmit: null,
    initialValues: {
        password: "",
        repassword: "",
    },
};

function ChangePasswordForm(props) {
    const { onSubmit, initialValues } = props;

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('This field is required').min(6),
        repassword: Yup.string().required('This field is required').oneOf([Yup.ref('password'), null], 'Password must match'),
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
                    <Form className="user-update">
                        <div className="container">
                            <BreadCrumb currentPage="Change password"/>
                        </div>
    
                        <div className="container">
                            <div className="row">
                                <aside id="column-left" className="col-sm-3">
                                    <AsideAccountInside />
                                </aside>
    
                                <div id="content" className="col-sm-9">
                                    <div className="row">                          
                                        <div className="well">
                                            <h2>Change password</h2>
                                            <div class="form-horizontal">
                                                <fieldset id="account">
                                                    <div class="form-group required">
                                                        <FastField 
                                                            component={InputField}
                                                            type="password" 
                                                            name="password" 
                                                            placeholder="New password" 
                                                            id="input-password" 
                                                            class="form-control margin-bottom-20px"
                                                            label="New password"
                                                        />
                                                    </div>
                                                    <div class="form-group required">
    
                                                        <FastField 
                                                            component={InputField}
                                                            type="password" 
                                                            name="repassword" 
                                                            placeholder="Confirm new password" 
                                                            id="input-repassword" 
                                                            class="form-control margin-bottom-20px"
                                                            label="Confirm"
                                                        />
    
                                                    </div>
                                            </fieldset>                       
                                                <div class="buttons">
                                                    <div class="centered">
                                                        <Link to="/account">
                                                            <button type="button" class="btn btn-primary" style={{marginRight: "10px"}}>Back</button>
                                                        </Link>
                                                        <button type="submit" class="btn btn-primary">
                                                            {isSubmitting && <svg
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
                                                            </svg>}
                                                            Update
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

export default ChangePasswordForm;