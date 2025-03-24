import { Checkbox, Form, InputNumber } from "antd";
import React from "react";
import { Button, FormContainer, FormSectionWithTitle } from "../../../components";
import DeleteIcon from "../../../icons/DeleteIcon";
import PlusIcon from "../../../icons/PlusIcon";

const PhysicalStoreEntries = () => {
  const isProductSelected = true;

  return (
    <FormSectionWithTitle
      title="Entries - physical store products"
      subtitle="Leave blank if you don’t want physical products for this draw"
      extra={<Button type="primary">Set cart image</Button>}
    >
      <FormContainer>
        {!isProductSelected && <Button type="primary">Select products</Button>}

        {isProductSelected && (
          <>
            <Form.List name="physical_store_entries">
              {(fields, { add, remove }) => (
                <>
                  <div className="flex gap-6 items-center bg-transparent -mt-3 py-3 pl-4 pr-3">
                    <div className="flex gap-4 items-center">
                      <span className="label-role">Award</span>
                      <Form.Item noStyle name={["award"]}>
                        <InputNumber min={1} defaultValue={1} />
                      </Form.Item>
                      <span className="label-role">entry for every</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Form.Item noStyle name={["spent"]}>
                        <InputNumber min={1} defaultValue={1} prefix="$" />
                      </Form.Item>
                      <span className="label-role">spent in store</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Form.Item noStyle name={["boost"]} valuePropName="checked">
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
                          <InputNumber min={1} defaultValue={1} />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="label-role">entry /</span>
                        <Form.Item noStyle {...restField} name={[name, "spent"]}>
                          <InputNumber min={1} defaultValue={1} prefix="$" />
                        </Form.Item>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="label-role">spent in store, for week</span>
                        <Form.Item noStyle {...restField} name={[name, "week"]}>
                          <InputNumber min={1} defaultValue={1} />
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
              )}
            </Form.List>
            <div className="mt-4 bg-[#EBEBEB] p-3 text-center text-gray-700 font-medium">
              You have <span className="font-bold">5</span> physical store products attached to this draw
            </div>
          </>
        )}
      </FormContainer>
    </FormSectionWithTitle>
  );
};

export default PhysicalStoreEntries;
