import { Space } from "antd";
import React from "react";

const CustomLabel = (props) => {
  const {
    label,
    info,
    direction = "vertical",
    spaceSize = 0,
    infoColor = "",
    infoFontWeight = "font-normal",
    infoTextSize = "text-xs",
  } = props;
  return (
    <Space size={spaceSize} direction={direction}>
      <span className="block label-role leading-none">{label}</span>
      {info && <span className={`${infoTextSize} ${infoFontWeight} ${infoColor}`.trim()}>{info}</span>}
    </Space>
  );
};

export default CustomLabel;
