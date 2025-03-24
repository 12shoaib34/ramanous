import { DatePicker } from "antd";
import React from "react";
import CalenderIcon from "../../icons/CalenderIcon";

const AntDatePicker = (props) => {
  const { ...rest } = props;

  return <DatePicker suffixIcon={null} prefix={<CalenderIcon />} className="w-full" {...rest} />;
};

export default AntDatePicker;
