import { Checkbox, Form, InputNumber } from "antd";
import dayjs from "dayjs";
import React from "react";
import { AntDatePicker, Button, FormContainer, FormSectionWithTitle } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import PlusIcon from "../../../icons/PlusIcon";

const PhysicalStoreEntries = () => {
  const isProductSelected = true; // Assuming products are selected for now, adjust as needed

  return (
    <FormSectionWithTitle title="Entries - physical store products">
      <FormContainer>
        {!isProductSelected && (
          <Button htmlType="button" type="primary">
            Select products
          </Button>
        )}

        {isProductSelected && (
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const physicalStoreEntries = getFieldValue("physicalStoreEntries") || [
                {
                  productType: "PHYSICAL", // Changed type
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

              const secondLastExpiry = physicalStoreEntries[physicalStoreEntries.length - 2]?.expires;
              const lastExpiry = physicalStoreEntries[physicalStoreEntries.length - 1]?.expires;
              const isBoosted = physicalStoreEntries.some((entry) => entry.type === true);

              return (
                <Form.List
                  initialValue={[
                    {
                      productType: "PHYSICAL", // Changed type
                      type: false,
                      startDate: combinedStartDateTime,
                    },
                  ]}
                  name="physicalStoreEntries" // Changed name
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
                                    name={[name, "spent"]}
                                    rules={[{ required: true, message: "Required" }]}
                                  >
                                    <InputNumber placeholder="Amount" min={1} prefix="$" />
                                  </Form.Item>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">expires:</span>
                                  <Form.Item
                                    noStyle
                                    {...restField}
                                    name={[name, "expires"]}
                                    rules={[{ required: true, message: "Required" }]}
                                  >
                                    <AntDatePicker
                                      placeholder="Select date"
                                      disabled={(!secondLastExpiry && index > 1) || fields?.length - 1 > index}
                                      disabledDate={(current) => {
                                        const isBeforeStartDate = secondLastExpiry
                                          ? current <= secondLastExpiry
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
                              const startDateValue = lastExpiry ? lastExpiry : combinedStartDateTime;
                              const expiresValue = startDateValue
                                ? dayjs(startDateValue).add(1, "day").endOf("day")
                                : null; // Set to null if no valid start date

                              add({
                                type: true,
                                productType: "PHYSICAL", // Changed type
                                startDate: startDateValue,
                                expires: expiresValue,
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
      </FormContainer>
    </FormSectionWithTitle>
  );
};

export default PhysicalStoreEntries; // Changed export
