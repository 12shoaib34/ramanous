import { DatePicker } from "antd";
import React from "react";
import CalenderIcon from "../../icons/CalenderIcon";

const AntDatePicker = (props) => {
  const { format = "DD MMM, YYYY", ...rest } = props;

  return <DatePicker format={format} suffixIcon={null} prefix={<CalenderIcon />} className="w-full" {...rest} />;
};

export default AntDatePicker;
