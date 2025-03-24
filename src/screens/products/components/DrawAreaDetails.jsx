import { Checkbox, Form, Input, Space } from "antd";
import React from "react";
import { FormContainer, FormSection, Button, CustomLabel } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import SearchIcon from "../../../icons/SearchIcon";

const DrawAreaDetails = () => {
  return (
    <FormSection>
      <FormContainer divider>
        <Form.Item
          label={
            <span>
              <h3 className="text-base font-medium">This draw is open to which users?</h3>
              <span className="text-sm">Select one or multiple</span>
            </span>
          }
          name="users"
        >
          <Checkbox.Group>
            <Space direction="vertical">
              <Checkbox value={1}>Paid subscribers + Package buyers</Checkbox>
              <Checkbox value={2}>Paid subscribers ONLY</Checkbox>
              <Checkbox value={3}>Package buyers ONLY</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
      </FormContainer>

      <FormContainer divider>
        <div className="grid grid-cols-4 items-center mt-form-item-spacing">
          <Form.Item className="col-span-1" name="is_unlimited" valuePropName="checked">
            <Checkbox value={1}>
              <span className="font-medium">Unlimited</span>
            </Checkbox>
          </Form.Item>
          <Form.Item
            className="col-span-3"
            label={<CustomLabel label="Entrants cap" info="How many max Entrants for this draw" />}
            name="entrants_cap"
          >
            <Input placeholder="Entrants cap" type="number" />
          </Form.Item>
        </div>
      </FormContainer>

      <FormContainer>
        <div className="mt-form-item-spacing">
          <Form.Item
            label={
              <span>
                <h3 className="text-base font-medium">Which areas are eligible for the draw?</h3>
                <span className="text-sm">Select one or multiple</span>
              </span>
            }
            name="areas_eligible"
          >
            <Input prefix={<SearchIcon />} placeholder="Search" type="search" />
          </Form.Item>
        </div>
      </FormContainer>

      {["Australia", "New Zealand"].map((item, i) => (
        <div key={i} className="mb-form-item-spacing">
          <FormContainer>
            <div className="flex items-center justify-between mb-form-item-spacing">
              <h3 className="font-medium">Australia</h3>
              <Button shape="circle" size="fit" theme="light" icon={<DeleteIcon />} />
            </div>
          </FormContainer>
          <FormContainer divider>
            <Form.Item name={item.toLowerCase()}>
              <Checkbox.Group>
                <Space direction="vertical">
                  <Checkbox value={"All"}>All</Checkbox>
                  {[1, 2, 3, 4, 5, 6, 7].map((area, i) => (
                    <Checkbox key={i} value={area}>
                      <span className="font-medium">Area {area}</span>
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Form.Item>
          </FormContainer>
        </div>
      ))}
    </FormSection>
  );
};

export default DrawAreaDetails;
