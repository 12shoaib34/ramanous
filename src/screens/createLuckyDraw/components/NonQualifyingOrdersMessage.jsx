import React from "react";
import { FormContainer, FormSection } from "../../../components";
import { Form, Input } from "antd";

const NonQualifyingOrdersMessage = () => {
  return (
    <FormSection>
      <FormContainer>
        <Form.Item label={"Non-qualifying orders message"} name="non_qualifying_orders_message">
          <Input.TextArea placeholder="Non-qualifying orders message" maxLength={160} showCount type="text" rows={5} />
        </Form.Item>
      </FormContainer>
    </FormSection>
  );
};

export default NonQualifyingOrdersMessage;
