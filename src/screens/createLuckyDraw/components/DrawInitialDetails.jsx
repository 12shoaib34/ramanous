import React from "react";
import { FormSection, FormContainer, AntDatePicker, AntTimePicker, CustomLabel } from "../../../components";
import { Form, Input, Select } from "antd";

const DrawInitialDetails = (props) => {
  const { form } = props;

  return (
    <FormSection>
      <FormContainer divider>
        <Form.Item
          className="input-max-w-base"
          label={
            <CustomLabel
              direction="horizontal"
              label="INTERNAL draw name"
              info="NOT SHOWN TO PUBLIC"
              infoColor="text-success-hint"
              infoFontWeight="font-medium"
              spaceSize={10}
            />
          }
          name="internal_draw_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          className="input-max-w-base"
          label={
            <CustomLabel
              direction="horizontal"
              label="PUBLIC draw name"
              info="PUBLIC!"
              infoColor="text-danger-hint"
              infoFontWeight="font-medium"
              spaceSize={10}
            />
          }
          name="public_draw_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input type="text" />
        </Form.Item>
      </FormContainer>

      <FormContainer divider>
        <div className="mt-form-item-spacing input-max-w-base grid grid-cols-3 gap-x-form-item-spacing">
          <Form.Item
            className="col-span-2 mb-0"
            label="Starting On..."
            name="start_date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <AntDatePicker placeholder="Select a date" />
          </Form.Item>
          <Form.Item
            className="col-span-1 mb-0"
            label="Start Time"
            name="start_time"
            rules={[{ required: true, message: "  " }]}
          >
            <AntTimePicker placeholder="Pick" />
          </Form.Item>
          <Form.Item
            className="col-span-2 mb-0"
            label="Ending On..."
            name="end_date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <AntDatePicker placeholder="Select a date" />
          </Form.Item>
          <Form.Item
            className="col-span-1 mb-0"
            label="End Time"
            name="end_time"
            rules={[{ required: true, message: "  " }]}
          >
            <AntTimePicker placeholder="Pick" />
          </Form.Item>
        </div>
      </FormContainer>

      <FormContainer>
        <div className="mt-form-item-spacing">
          <Form.Item className="input-max-w-base" label="Draw Time Zone" name="time_zone" rules={[{ required: true }]}>
            <Select placeholder="Select a time zone">
              <Select.Option value="1">1</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </FormContainer>
    </FormSection>
  );
};

export default DrawInitialDetails;
