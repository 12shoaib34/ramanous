import React from "react";
import { FormSection, FormContainer, AntDatePicker, AntTimePicker, CustomLabel } from "../../../components";
import { Form, Input, Select } from "antd";
import moment from "moment-timezone"; // Import moment-timezone

const DrawInitialDetails = (props) => {
  const { form } = props;

  // Get time zone names from moment-timezone
  const timeZoneNames = moment.tz.names();

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
          name="luckyDrawName"
          rules={[{ required: true, message: "Please enter the internal draw name" }]}
        >
          <Input type="text" placeholder="Enter internal draw name" />
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
          name="publicName"
          rules={[{ required: true, message: "Please enter the public draw name" }]}
        >
          <Input type="text" placeholder="Enter public draw name" />
        </Form.Item>
      </FormContainer>

      <FormContainer divider>
        <div className="mt-form-item-spacing input-max-w-base grid grid-cols-3 gap-x-form-item-spacing">
          <Form.Item
            className="col-span-2 mb-0"
            label="Starting On..."
            name="startDateTime"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <AntDatePicker placeholder="Select a date" />
          </Form.Item>
          <Form.Item
            className="col-span-1 mb-0"
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please select a start time" }]}
          >
            <AntTimePicker format={"hh:mm"} placeholder="Pick" />
          </Form.Item>
          <Form.Item
            className="col-span-2 mb-0"
            label="Ending On..."
            name="endDateTime"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <AntDatePicker placeholder="Select a date" />
          </Form.Item>
          <Form.Item
            className="col-span-1 mb-0"
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select an end time" }]}
          >
            <AntTimePicker format={"hh:mm"} placeholder="Pick" />
          </Form.Item>
        </div>
      </FormContainer>

      <FormContainer>
        <div className="mt-form-item-spacing">
          <Form.Item
            className="input-max-w-base"
            label="Draw Time Zone"
            name="timeZone"
            rules={[{ required: true, message: "Please select a time zone" }]}
          >
            <Select
              showSearch // Enable searching
              placeholder="Select a time zone"
              optionFilterProp="children" // Search based on the option text
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())} // Basic case-insensitive search
              options={timeZoneNames.map((tz) => ({
                value: tz, // Use the time zone name as the value
                label: tz, // Use the time zone name as the label
              }))}
            />
          </Form.Item>
        </div>
      </FormContainer>
    </FormSection>
  );
};

export default DrawInitialDetails;
