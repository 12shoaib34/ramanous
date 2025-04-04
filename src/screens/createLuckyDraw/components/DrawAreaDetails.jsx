import { Checkbox, Form, Input, Radio, Select, Space } from "antd";
import React, { useEffect } from "react";
import { FormContainer, FormSection, Button, CustomLabel } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import SearchIcon from "../../../icons/SearchIcon";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../../common/thunk";
import { normalizeString } from "../../../utils/helper";

const DrawAreaDetails = ({ form }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const countries = useSelector((state) => state?.common?.countries);

  const onCheckAll = (e, country) => {
    const name = normalizeString(country?.name); // Use the helper function for consistency
    const checked = e.target.checked;
    const allStateIds = country?.State?.map((item) => item?.stateId) || [];

    if (checked) {
      // Set the value to include "all" and all state IDs
      form.setFieldValue(name, ["all", ...allStateIds]);
    } else {
      // Clear the value
      form.setFieldValue(name, []);
    }
  };

  return (
    <FormSection>
      <FormContainer divider>
        <Form.Item
          rules={[{ required: true, message: "Please select which users this draw is open to" }]}
          label={<CustomLabel label="This draw is open to which users?" info="Select one or multiple" />}
          name="drawTypes"
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={"PAID_AND_BUYER"}>Paid subscribers + Package buyers</Radio>
              <Radio value={"PAID"}>Paid subscribers ONLY</Radio>
              <Radio value={"BUYER"}>Package buyers ONLY</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </FormContainer>

      <FormContainer divider>
        <div className="grid grid-cols-4 items-center mt-form-item-spacing">
          <Form.Item className="col-span-1" name="isUnlimited" valuePropName="checked">
            <Checkbox
              value={1}
              onChange={(e) => {
                if (e.target.checked) {
                  form.setFieldValue("entrantsCap", undefined); // Clear entrantsCap when unlimited is checked
                }
              }}
            >
              <span className="font-medium">Unlimited</span>
            </Checkbox>
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const isUnlimited = getFieldValue("isUnlimited");
              return (
                <Form.Item
                  className="col-span-3"
                  label={<CustomLabel label="Entrants cap" info="How many max Entrants for this draw" />}
                  name="entrantsCap"
                  rules={[
                    {
                      required: !isUnlimited, // Required only if 'isUnlimited' is false
                      message: "Please enter the entrants cap",
                    },
                  ]}
                >
                  <Input disabled={isUnlimited} placeholder="Entrants cap" type="number" />
                </Form.Item>
              );
            }}
          </Form.Item>
        </div>
      </FormContainer>

      <FormContainer>
        <div className="mt-form-item-spacing">
          <Form.Item
            label={<CustomLabel label="Which areas are eligible for the draw?" info="Select one or multiple" />}
            name="countryIds"
            rules={[{ required: true, message: "Please select at least one country" }]}
          >
            <Select
              placeholder="Search or select"
              mode="multiple"
              showSearch
              optionFilterProp="children"
              prefix={<SearchIcon />}
              loading={countries?.loading}
            >
              {countries?.data?.map((item, i) => (
                <Select.Option key={i} value={item.countryId}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </FormContainer>
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const selectedCountryIds = getFieldValue("countryIds") || [];
          const selectedCountries = countries?.data?.filter((f) => selectedCountryIds.includes(f.countryId));

          return selectedCountries?.map((country, index) => (
            <div key={index} className="mb-form-item-spacing">
              <FormContainer>
                <div className="flex items-center justify-between mb-form-item-spacing">
                  <h3 onClick={() => console.log(form.getFieldsValue())} className="font-medium">
                    {country.name}
                  </h3>
                  <Button
                    shape="circle"
                    size="fit"
                    theme="light"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      const currentCountryIds = form.getFieldValue("countryIds") || [];
                      const countryIdToRemove = country.countryId;
                      const newCountryIds = currentCountryIds.filter((id) => id !== countryIdToRemove);
                      form.setFieldValue("countryIds", newCountryIds);
                      // Also remove the state values associated with this country
                      form.setFieldValue(normalizeString(country?.name), undefined);
                    }}
                  />
                </div>
              </FormContainer>
              <FormContainer divider>
                <Form.Item
                  name={normalizeString(country?.name)}
                  rules={[{ required: true, message: `Please select states/regions for ${country.name}` }]}
                >
                  {/* We need access to the current value to control the "All" checkbox */}
                  <Form.Item shouldUpdate noStyle>
                    {({ getFieldValue }) => {
                      const countryName = normalizeString(country?.name);
                      const currentValues = getFieldValue(countryName) || [];
                      const allStateIds = country?.State?.map((item) => item?.stateId) || [];

                      const handleGroupChange = (selectedStateIds) => {
                        let newValue;
                        // Check if all individual states are now selected
                        if (allStateIds.length > 0 && selectedStateIds.length === allStateIds.length) {
                          // If all states selected, ensure 'all' is included
                          newValue = ["all", ...selectedStateIds];
                        } else {
                          // Otherwise, just use the selected IDs (removing 'all' implicitly if it was there)
                          newValue = selectedStateIds;
                        }
                        form.setFieldValue(countryName, newValue);
                      };

                      // Determine if 'all' checkbox should be checked
                      const isAllChecked = currentValues.includes("all");
                      // Filter 'all' out before passing to Checkbox.Group value prop
                      const groupValue = currentValues.filter((v) => v !== "all");

                      return (
                        <Space direction="vertical">
                          <Checkbox
                            checked={isAllChecked} // Explicitly control checked state
                            onChange={(e) => onCheckAll(e, country)}
                          >
                            All
                          </Checkbox>
                          <Checkbox.Group
                            value={groupValue} // Use filtered value for the group
                            onChange={handleGroupChange} // Add explicit onChange handler
                          >
                            <Space direction="vertical">
                              {country.State?.map((area, i) => (
                                <Checkbox key={i} value={area.stateId}>
                                  <span className="font-medium">{area.name}</span>
                                </Checkbox>
                              ))}
                            </Space>
                          </Checkbox.Group>
                        </Space>
                      );
                    }}
                  </Form.Item>
                </Form.Item>
              </FormContainer>
            </div>
          ));
        }}
      </Form.Item>
    </FormSection>
  );
};

export default DrawAreaDetails;
