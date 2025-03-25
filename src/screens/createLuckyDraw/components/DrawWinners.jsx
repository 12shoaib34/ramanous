import React from "react";
import { CustomLabel, FormContainer, FormSection } from "../../../components";
import { Form, InputNumber } from "antd";

const DrawWinners = () => {
  return (
    <FormSection>
      <FormContainer>
        <Form.Item label={<CustomLabel label="Winners" info="How many winners?" />} name="winners">
          <InputNumber placeholder="Winners" style={{ width: "140px" }} />
        </Form.Item>
      </FormContainer>
    </FormSection>
  );
};

export default DrawWinners;
