import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import InfoIcon from "../../icons/InfoIcon";
import Input from "../Input/Input";
import PropTypes from "prop-types";

const InputFormItem = (props) => {
  const { label, name, disabled = false, error, required, message = "", pattern = {}, labelChildren } = props;

  const errorInputValues = error?.ref?.value;
  const isError = !!error?.message;
  const errorMessage = errorInputValues
    ? pattern?.message
    : isError && message
    ? message
    : `(${name || label}) is required`;
  const inputProps = { ...props, errorMessage, isError };

  return (
    <div className="flex flex-col gap-100 relative">
      {label && (
        <div className="flex items-center">
          <label className={`${disabled ? "text-disabled-text" : ""}`} htmlFor={name}>
            {label}
            {required && <span className="text-critical-text ml-1">*</span>}
          </label>
          {labelChildren && labelChildren}
        </div>
      )}

      <Input {...inputProps} />

      <div className="h-[20px] pl-100">
        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.1 }}
              className="flex items-center gap-200 text-critical-text"
            >
              <InfoIcon className="fill-critical-text" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

InputFormItem.propTypes = {
  label: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  register: PropTypes.func,
  errors: PropTypes.object,
  required: PropTypes.bool,
  message: PropTypes.string,
  pattern: PropTypes.string,
  labelChildren: PropTypes.any,
};

export default InputFormItem;
