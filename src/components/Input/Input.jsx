import React, { useState } from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  const {
    label,
    name,
    disabled = false,
    type = "text",
    inputMode = "text",
    placeholder = "",
    register = () => {},
    errors,
    required,
    errorMessage,
    isError,
    pattern,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`w-full overflow-hidden relative rounded-lg border disabled:bg-disabled disabled:text-disabled-text disabled:cursor-not-allowed disabled:border-none ${
        isError
          ? "border-critical-border bg-critical"
          : "border-input-border hover:border-input-hover-border focus:border-input-active-border bg-surface hover:bg-surface-hover active:bg-surface-active focus:bg-surface-hover"
      } ${isFocused ? "outline-2 outline-focus outline-offset-1" : ""}`}
    >
      <input
        {...rest}
        {...register(name, {
          required: required ? errorMessage : false,
          pattern: pattern,
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-full input-padding outline-none`}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        type={type}
        id={name}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  errors: PropTypes.object,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
};

export default Input;
