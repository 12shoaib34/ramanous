import { TimePicker } from "antd";
import React from "react";
import WatchIcon from "../../icons/WatchIcon";

const AntTimePicker = (props) => {
  const { ...rest } = props;
  return <TimePicker {...rest} prefix={<WatchIcon />} suffixIcon={null} />;
};

export default AntTimePicker;
