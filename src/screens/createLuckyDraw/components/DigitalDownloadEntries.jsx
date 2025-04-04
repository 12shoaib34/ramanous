import React, { useState } from "react";
import { Form, InputNumber, Checkbox, DatePicker, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormContainer, FormSectionWithTitle, Button, AntDatePicker } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import PlusIcon from "../../../icons/PlusIcon";
import dayjs from "dayjs";
import PencilIcon from "../../../icons/PencilIcon";

// Accept selectedProducts prop
// Accept onClearSelection prop
const DigitalDownloadEntries = ({ openProductModal, productsSelected, selectedProducts = [], onClearSelection }) => {
  // Accept openProductModal and productsSelected props
  // Remove local isProductSelected

  // Get image URL from the first selected product, assuming 'imageUrl' property
  const firstProductImageUrl = selectedProducts?.[0]?.imageUrl;

  return (
    <FormSectionWithTitle
      title="Entries - digital download products"
      // Conditionally render the image suffix
      titleSuffix={
        firstProductImageUrl ? (
          <img src={firstProductImageUrl} alt="Selected Product" className="w-10 h-10 object-contain" />
        ) : null
      }
    >
      <FormContainer>
        {/* Add onClick handler and htmlType */}
        {/* Use productsSelected prop for conditional rendering */}
        {!productsSelected && <Button onClick={() => openProductModal("DIGITAL")}>Select products</Button>}

        {/* Use productsSelected prop for conditional rendering */}
        {productsSelected && (
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const digitalDownloadEntries = getFieldValue("digitalDownloadEntries") || [
                {
                  productType: "DIGITAL",
                  type: false,
                },
              ];

              const startDateTime = getFieldValue("startDateTime");
              const startTime = getFieldValue("startTime");
              const combinedStartDateTime =
                startDateTime && startTime
                  ? dayjs(startDateTime)
                      .hour(dayjs(startTime).hour())
                      .minute(dayjs(startTime).minute())
                      .second(dayjs(startTime).second())
                  : null;

              const endDateTime = getFieldValue("endDateTime");
              const endTime = getFieldValue("endTime");
              const combinedEndDateTime =
                endDateTime && endTime
                  ? dayjs(endDateTime)
                      .hour(dayjs(endTime).hour())
                      .minute(dayjs(endTime).minute())
                      .second(dayjs(endTime).second())
                  : null;

              // Read endTime instead of expires
              const secondLastEndTime = digitalDownloadEntries[digitalDownloadEntries.length - 2]?.endTime;
              const lastEndTime = digitalDownloadEntries[digitalDownloadEntries.length - 1]?.endTime;
              const isBoosted = digitalDownloadEntries.some((entry) => entry.type === true);

              return (
                <Form.List
                  initialValue={[
                    {
                      type: false,
                      productType: "DIGITAL",
                      // Use startTime and endTime in initialValue
                      startTime: combinedStartDateTime,
                      endTime: combinedEndDateTime,
                    },
                  ]}
                  name="digitalDownloadEntries"
                >
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <>
                            {index === 0 ? (
                              <>
                                <div className="flex flex-wrap gap-6 items-center bg-transparent -mt-3 py-3 pl-4 pr-3">
                                  <div className="flex gap-4 items-center">
                                    <span className="label-role">Awards</span>
                                    <Form.Item
                                      noStyle
                                      name={[name, "award"]}
                                      rules={[{ required: true, message: "Required" }]}
                                    >
                                      <InputNumber placeholder="Awards" min={1} />
                                    </Form.Item>
                                    <span className="label-role">entry for every</span>
                                  </div>
                                  <div className="flex gap-4 items-center">
                                    <Form.Item
                                      noStyle
                                      name={[name, "dollarSpent"]}
                                      rules={[{ required: true, message: "Required" }]}
                                    >
                                      <InputNumber placeholder="Amount" min={1} prefix="$" />
                                    </Form.Item>
                                    <span className="label-role">spent</span>
                                  </div>
                                  <div className="flex gap-4 items-center">
                                    <Form.Item noStyle name={[name, "type"]} valuePropName="checked">
                                      <Checkbox disabled={fields.length > 1} />
                                    </Form.Item>
                                    <span className="label-role">Boost?</span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div
                                className="flex gap-6 items-center border-b last:border-none border-gray-300 bg-[#EBEBEB] py-3 pl-4 pr-3"
                                key={key}
                              >
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">Award</span>
                                  <Form.Item
                                    noStyle
                                    {...restField}
                                    name={[name, "award"]}
                                    rules={[{ required: true, message: "Required" }]}
                                  >
                                    <InputNumber placeholder="Awards" min={1} />
                                  </Form.Item>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">entry /</span>
                                  <Form.Item
                                    noStyle
                                    {...restField}
                                    name={[name, "dollarSpent"]}
                                    rules={[{ required: true, message: "Required" }]}
                                  >
                                    <InputNumber placeholder="Amount" min={1} prefix="$" />
                                  </Form.Item>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">End Time:</span>
                                  <Form.Item
                                    noStyle
                                    {...restField}
                                    name={[name, "endTime"]} // Change name to endTime
                                    rules={[{ required: true, message: "Required" }]}
                                  >
                                    <AntDatePicker
                                      placeholder="Select date"
                                      // Update disabled logic to use secondLastEndTime
                                      disabled={(!secondLastEndTime && index > 1) || fields?.length - 1 > index}
                                      disabledDate={(current) => {
                                        const isBeforeStartDate = secondLastEndTime
                                          ? current <= secondLastEndTime // Use secondLastEndTime
                                          : current <= startDateTime || dayjs(current).isBefore(startTime, "day");
                                        const isAfterEndDate = combinedEndDateTime
                                          ? current > combinedEndDateTime
                                          : false;
                                        return isBeforeStartDate || isAfterEndDate;
                                      }}
                                      format="DD MMM, YY"
                                    />
                                  </Form.Item>
                                </div>
                                <Button
                                  onClick={() => remove(name)}
                                  shape="circle"
                                  size="fit"
                                  theme="light"
                                  icon={<DeleteIcon />}
                                />
                              </div>
                            )}
                          </>
                        ))}

                        {isBoosted && (
                          <Button
                            className="mt-form-item-spacing"
                            padding="p-1"
                            theme="light"
                            onClick={() => {
                              // Use lastEndTime and combinedStartDateTime for startTimeValue
                              const startTimeValue = lastEndTime ? lastEndTime : combinedStartDateTime;
                              const endTimeValue = startTimeValue
                                ? dayjs(startTimeValue).add(1, "day").endOf("day")
                                : null; // Set to null if no valid start time

                              add({
                                type: true,
                                productType: "DIGITAL",
                                startTime: startTimeValue, // Use startTime key
                                endTime: endTimeValue, // Use endTime key
                              });
                            }}
                            icon={<PlusIcon />}
                          >
                            Add another boosted period
                          </Button>
                        )}
                      </div>
                    );
                  }}
                </Form.List>
              );
            }}
          </Form.Item>
        )}
        {/* Add Footer Summary Section */}
        {productsSelected && (
          <div className="flex justify-between items-center p-3 bg-gray-100 border-t border-gray-200 mt-4">
            <span className="text-sm text-gray-600">
              You have <strong>{selectedProducts.length}</strong> digital download products attached to this draw
            </span>
            <div className="flex">
              {/* Placeholder for Edit Icon Button */}
              <Button
                size="small"
                theme="light"
                shape="circle"
                icon={<PencilIcon />}
                onClick={() => openProductModal("DIGITAL")}
              />
              {/* Placeholder for Delete Icon Button */}
              <Button
                size="small"
                theme="light"
                shape="circle"
                icon={<DeleteIcon />}
                onClick={onClearSelection} // Use the passed handler
              />
            </div>
          </div>
        )}
      </FormContainer>
    </FormSectionWithTitle>
  );
};

export default DigitalDownloadEntries;
