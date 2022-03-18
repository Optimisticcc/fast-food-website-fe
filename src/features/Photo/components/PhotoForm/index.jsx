import ImageSelectField from "components/ImageSelectField";
import InputField from "components/InputField";
import SelectField from "components/SelectField";
import { FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
// component photo form
PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};
PhotoForm.defaultProps = {
  onSubmit: null,
  initialValues: {
    title: "",
    category: null,
    image: "",
  }
};
function PhotoForm(props) {
  const { onSubmit, initialValues } = props;

  const PHOTO_CATEGORY_OPTIONS = [
    {
      value: 1,
      label: "Category 1",
    },
    {
      value: 2,
      label: "Category 2",
    },
    {
      value: 3,
      label: "Category 3",
    },
    {
      value: 4,
      label: "Category 4",
    },
    {
      value: 5,
      label: "Category 5",
    },
  ];

  const validateSchema = Yup.object().shape({
    title: Yup.string().required(),

    category: Yup.number().required().nullable(),

    image: Yup.string().required(),
  });
  return (
    <Formik
      validationSchema={validateSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        // do something here
        const { values, errors, touched, isSubmitting } = formikProps;
        return (
          <Form className="block w-96 mx-auto">
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature"
              breakDown={true}
            />
            <FastField
              name="category"
              component={SelectField}
              label="Category"
              placeholder="Select category"
              options={PHOTO_CATEGORY_OPTIONS}
            />
            <FastField
              name="image"
              component={ImageSelectField}
              label="Image"
            />
            <button className="btn-yellow flex items-center" type="submit">
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
              
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
