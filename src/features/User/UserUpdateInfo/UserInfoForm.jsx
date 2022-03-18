import React from "react";
import BreadCrumb from "components/BreadCrumb";
import AsideAccountInside from "components/Aside/AsideAccountInside"
import { FastField, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import PropTypes from "prop-types";
import * as Yup from 'yup';

UserInfoForm.propTypes = {
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
};

UserInfoForm.defaultProps = {
    onSubmit: null,
    initialValues: {
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
    },
};

function UserInfoForm(props) {
    const { onSubmit, initialValues } = props;
    const handleReset = (resetForm) => {
          resetForm();
      };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required'),
        address: Yup.string().required('This field is required'),
        email: Yup.string().required('This field is required'),
        phoneNumber: Yup.number().required('This field is required'),
        dateOfBirth: Yup.date().required('This field is required')
    });
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize 
        >
            {(formikProps) => {
                const { values, errors, touched, isSubmitting } = formikProps;
                return (
                    <Form className="user-update">
                        <div className="container">
                            <BreadCrumb currentPage="My account"/>
                        </div>
    
                        <div className="container">
                            <div className="row">
                                <aside id="column-left" className="col-sm-3">
                                    <AsideAccountInside />
                                </aside>
    
                                <div id="content" className="col-sm-9">
                                    <div className="row">                          
                                        <div className="well">
                                            <h2>User Information</h2>
                                            <div class="form-horizontal">
                                                <fieldset id="account">
                                                    <div class="form-group required">
                                                        <FastField 
                                                            component={InputField}
                                                            type="text" 
                                                            name="name" 
                                                            placeholder="Name" 
                                                            id="input-name" 
                                                            class="form-control margin-bottom-20px"
                                                            label="Name"
                                                        />
                                                    </div>
                                                    <div class="form-group required">
    
                                                        <FastField 
                                                            component={InputField}
                                                            type="text" 
                                                            name="address" 
                                                            placeholder="Address" 
                                                            id="input-address" 
                                                            class="form-control margin-bottom-20px"
                                                            label="Address"
                                                        />
    
                                                    </div>
                                                    <div class="form-group required">
    
                                                        <FastField 
                                                            component={InputField}
                                                            type="email" 
                                                            name="email" 
                                                            placeholder="E-Mail" 
                                                            id="input-email" 
                                                            class="form-control margin-bottom-20px"
                                                            label="E-mail"
                                                        />
    
                                                    </div>
                                                    <div class="form-group required">
    
                                                        <FastField 
                                                            component={InputField}
                                                            type="tel" 
                                                            name="phoneNumber" 
                                                            placeholder="Telephone" 
                                                            id="input-telephone" 
                                                            class="form-control margin-bottom-20px"
                                                            label="Telephone"
                                                        />
    
                                                    </div>
                                                    <div class="form-group required">
    
                                                        <FastField 
                                                            component={InputField}
                                                            type="date" 
                                                            name="dateOfBirth" 
                                                            placeholder="Date of birth" 
                                                            id="input-dob" 
                                                            class="form-control margin-bottom-20px"
                                                            label="Birthday"
                                                        />
    

                                                    </div>
                                                </fieldset>                       
                                                <div class="buttons">
                                                    <div class="centered">
                                                        <button type="button" class="btn btn-primary" style={{marginRight: "10px"}} onClick={handleReset.bind(null, formikProps.resetForm)}>Back</button>
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

export default UserInfoForm;