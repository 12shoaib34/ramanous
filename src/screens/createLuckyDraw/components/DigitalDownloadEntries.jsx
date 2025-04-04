import React from "react";
import { Form, InputNumber, Checkbox, DatePicker, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormContainer, FormSectionWithTitle, Button } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import PlusIcon from "../../../icons/PlusIcon";

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
          <Form.List name="digital_download_entries">
            {(fields, { add, remove }) => {
              return (
                <>
                  <div className="flex flex-wrap gap-6 items-center bg-transparent -mt-3 py-3 pl-4 pr-3">
                    <div className="flex gap-4 items-center">
                      <span className="label-role">Awards</span>
                      <Form.Item noStyle name={["award"]}>
                        <InputNumber min={1} defaultValue={100} />
                      </Form.Item>
                      <span className="label-role">entry for every</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Form.Item noStyle name={["dollarSpent"]}>
                        <InputNumber min={1} defaultValue={50} prefix="$" />
                      </Form.Item>
                      <span className="label-role">spent</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Form.Item noStyle name={["type"]} valuePropName="checked">
                        <Checkbox />
                      </Form.Item>
                      <span className="label-role">Boost?</span>
                    </div>
                  </div>

                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      className="flex gap-6 items-center border-b last:border-none border-gray-300 bg-[#EBEBEB] py-3 pl-4 pr-3"
                      key={key}
                    >
                      <div className="flex gap-4 items-center">
                        <span className="label-role">Award</span>
                        <Form.Item noStyle {...restField} name={[name, "award"]}>
                          <InputNumber min={1} defaultValue={200} />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="label-role">entry /</span>
                        <Form.Item noStyle {...restField} name={[name, "spent"]}>
                          <InputNumber min={1} defaultValue={50} prefix="$" />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="label-role">expires:</span>
                        <Form.Item noStyle {...restField} name={[name, "expires"]}>
                          <DatePicker format="DD MMM, YY" />
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
                  ))}

                  <Button
                    className="mt-form-item-spacing"
                    padding="p-1"
                    theme="light"
                    onClick={() => add()}
                    icon={<PlusIcon />}
                  >
                    Add another boosted period
                  </Button>
                </>
              );
            }}
          </Form.List>
        )}
      </FormContainer>
    </FormSectionWithTitle>
  );
};

export default DigitalDownloadEntries;
