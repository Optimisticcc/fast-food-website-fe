import React from "react";
import PropTypes from "prop-types";
import ImageSelector from "./ImageSelector";

ImageSelectField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,

  label: PropTypes.string,
};

ImageSelectField.defaultProps = {
  label: "",
};

function ImageSelectField(props) {
  const { field, form, label } = props;
  const { name, value, onBlur } = field;
  const { touched,errors } = form
  const showError = touched[name] && errors[name]
  const handleImageUrlChange = (newImg) => {
    console.log(newImg)
    form.setFieldValue(name, newImg);
  };
  return (
    <div>
      {label && <label htmlFor={label}>{name}</label>}
      <ImageSelector
        name={name}
        imageUrl={value}
        onImageChange={handleImageUrlChange}
        onRandomButtonBlur={onBlur}
      />
      {showError && <p className="text-sm text-red-600 ml-2 mt-1">{errors[name]}</p>}
    </div>
  );
}

export default ImageSelectField;
