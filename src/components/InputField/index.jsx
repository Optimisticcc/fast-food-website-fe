import React from "react";
import PropTypes from "prop-types";

InputField.propTypes = {
  // from fastfield truyen sang
  form: PropTypes.object,
  field: PropTypes.object,
  // field truyen sang do minh tu truyen
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  breakDown: PropTypes.bool,
  width: PropTypes.bool,
};
InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  breakDown: false,
  width: false,
};
function InputField(props) {
  const { field, form, label, placeholder, disabled, type, breakDown, width } =
    props;
  const { name } = field;
  const { touched, errors } = form;
  const showError = touched[name] && errors[name];
  return (
    <div style={{ width: "100%" }}>
      <div className="grid grid-cols-12 grid-rows-2 ml-12">
        <div className="col-span-1 flex items-center">{label && <label htmlFor={name}>{label}</label>}</div>
        {breakDown && <br />}
          <input
            id={name}
            {...field}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={`border-2 col-start-3 col-span-9 border-gray-500 border-dotted rounded-full py-2 px-3 outline-none ${showError && "border-red-600"}`}
            style={window.innerWidth < 575 ? {width: "75%", marginLeft: "30px"} : {}}
          />
          {showError && (
            <p className="text-sm text-red-600 mt-1 ml-1 uppercase col-start-3 col-span-9">
              {errors[name]}
            </p>
          )}
      </div>
    </div>
  );
}

export default InputField;
