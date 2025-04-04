import React, { useState } from "react";
import { Form, InputNumber, Checkbox, DatePicker, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormContainer, FormSectionWithTitle, Button, AntDatePicker } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import PlusIcon from "../../../icons/PlusIcon";
import dayjs from "dayjs";

const DigitalDownloadEntries = () => {
  const isProductSelected = true;

  return (
    <FormSectionWithTitle title="Entries - digital download products">
      <FormContainer>
        {!isProductSelected && (
          <Button htmlType="button" type="primary">
            Select products
          </Button>
        )}

        {isProductSelected && (
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
              const secondLastExpiry = digitalDownloadEntries[digitalDownloadEntries.length - 2]?.expires;
              const lastExpiry = digitalDownloadEntries[digitalDownloadEntries.length - 1]?.expires;
              const isBoosted = digitalDownloadEntries.some((entry) => entry.type === true);

              console.log(digitalDownloadEntries, "digitalDownloadEntries");

              return (
                <Form.List
                  initialValue={[
                    {
                      productType: "DIGITAL",
                      type: false,
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
                                    <Form.Item noStyle name={[name, "award"]}>
                                      <InputNumber placeholder="Awards" min={1} />
                                    </Form.Item>
                                    <span className="label-role">entry for every</span>
                                  </div>
                                  <div className="flex gap-4 items-center">
                                    <Form.Item noStyle name={[name, "dollarSpent"]}>
                                      <InputNumber min={1} prefix="$" />
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
                                  <Form.Item noStyle {...restField} name={[name, "award"]}>
                                    <InputNumber min={1} />
                                  </Form.Item>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">entry /</span>
                                  <Form.Item noStyle {...restField} name={[name, "spent"]}>
                                    <InputNumber min={1} prefix="$" />
                                  </Form.Item>
                                </div>
                                <div className="flex gap-4 items-center">
                                  <span className="label-role">expires:</span>
                                  <Form.Item noStyle {...restField} name={[name, "expires"]}>
                                    <AntDatePicker
                                      disabled={(!secondLastExpiry && index > 1) || fields?.length - 1 > index}
                                      disabledDate={(current) =>
                                        secondLastExpiry
                                          ? current <= secondLastExpiry
                                          : current <= startDateTime || dayjs(current).isBefore(startTime, "day")
                                      }
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
                            onClick={() =>
                              add({
                                type: "BOOST",
                                productType: "DIGITAL",
                                startDate: lastExpiry,
                                expires: dayjs(lastExpiry).add(1, "day").endOf("day"),
                              })
                            }
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

export default DigitalDownloadEntries;
