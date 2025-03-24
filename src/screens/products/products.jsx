import { Button, Checkbox, Form, Input, InputNumber, Select, Space, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React from "react";
import { AntDatePicker, AntTimePicker, ProductRow } from "../../components";
import DeleteIcon from "../../icons/DeleteIcon";
import PlusIcon from "../../icons/PlusIcon";
import SearchIcon from "../../icons/SearchIcon";

const Products = (props) => {
  const [form] = Form.useForm();

  const onUploadMetaImage = (file) => {
    form.setFieldValue("meta_image", file);
    return false;
  };

  return (
    <Form form={form} layout="vertical">
      <div className="grid grid-cols-2 gap-5 px-5 pb-2 pt-2">
        <div>
          <FormHeader />
          <div className="flex flex-col gap-form-item-spacing">
            <Section>
              <Container divider>
                <Form.Item
                  className="input-max-w-base"
                  label={
                    <span>
                      INTERNAL draw name <span className="text-success-hint ml-2">NOT SHOWN TO PUBLIC</span>
                    </span>
                  }
                  name="internal_draw_name"
                >
                  <Input type="text" />
                </Form.Item>
                <Form.Item
                  className="input-max-w-base"
                  label={
                    <span>
                      PUBLIC draw name <span className="text-danger-hint ml-2">PUBLIC!</span>
                    </span>
                  }
                  name="public_draw_name"
                >
                  <Input type="text" />
                </Form.Item>
              </Container>

              <Container divider>
                <div className="mt-form-item-spacing input-max-w-base grid grid-cols-3 gap-x-form-item-spacing">
                  <Form.Item className="col-span-2 mb-0" label="Starting On..." name="start_date">
                    <AntDatePicker placeholder="Select a date" />
                  </Form.Item>
                  <Form.Item className="col-span-1 mb-0" label="Start Time" name="start_time">
                    <AntTimePicker placeholder="Pick" />
                  </Form.Item>
                  <Form.Item className="col-span-2 mb-0" label="Ending On..." name="end_date">
                    <AntDatePicker placeholder="Select a date" />
                  </Form.Item>
                  <Form.Item className="col-span-1 mb-0" label="End Time" name="end_time">
                    <AntTimePicker placeholder="Pick" />
                  </Form.Item>
                </div>
              </Container>

              <Container>
                <div className="mt-form-item-spacing">
                  <Form.Item className="input-max-w-base" label="Draw Time Zone" name="time_zone">
                    <Select placeholder="Select a time zone">
                      <Select.Option value="1">1</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Container>
            </Section>

            <Section>
              <Container>
                <Form.Item className="input-max-w-base" label="Meta title" name="meta_title">
                  <Input placeholder="Meta title" type="text" />
                </Form.Item>
                <Form.Item label="Meta description" name="meta_description">
                  <Input.TextArea placeholder="Meta description" maxLength={160} showCount type="text" rows={5} />
                </Form.Item>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    const metaImage = getFieldValue("meta_image");
                    const url = metaImage ? URL.createObjectURL(metaImage) : "";

                    return (
                      <Form.Item className="input-max-w-base" label="Meta image" name="meta_image">
                        <ImgCrop aspect={290 / 105}>
                          <Upload.Dragger
                            showUploadList={false}
                            beforeUpload={onUploadMetaImage}
                            maxCount={1}
                            style={{ width: "max-content" }}
                          >
                            <div style={{ width: 290, height: 105 }}>
                              {metaImage ? (
                                <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                              ) : (
                                <div className="flex flex-col justify-center items-center h-full">
                                  <span className="text-sm">Upload an image</span>
                                </div>
                              )}
                            </div>
                          </Upload.Dragger>
                        </ImgCrop>
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Container>
            </Section>

            <Section>
              <Container divider>
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
              </Container>

              <Container divider>
                <div className="grid grid-cols-4 items-center mt-form-item-spacing">
                  <Form.Item className="col-span-1" name="is_unlimited" valuePropName="checked">
                    <Checkbox value={1}>
                      <span className="font-medium">Unlimited</span>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    className="col-span-3"
                    label={
                      <span>
                        <h3 className="text-base font-medium">Entrants cap</h3>
                        <span className="text-sm">How many max Entrants for this draw</span>
                      </span>
                    }
                    name="entrants_cap"
                  >
                    <Input placeholder="Entrants cap" type="number" />
                  </Form.Item>
                </div>
              </Container>

              <Container>
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
              </Container>

              {["Australia", "New Zealand"].map((item) => (
                <div key={item} className="mb-form-item-spacing">
                  <Container>
                    <div className="flex items-center justify-between mb-form-item-spacing">
                      <h3 className="font-medium">Australia</h3>
                      <Button size="small" type="link" shape="circle" icon={<DeleteIcon />} />
                    </div>
                  </Container>
                  <Container divider>
                    <Form.Item name={item.toLowerCase()}>
                      <Checkbox.Group>
                        <Space direction="vertical">
                          <Checkbox value={"All"}>All</Checkbox>
                          {[1, 2, 3, 4, 5, 6, 7].map((area) => (
                            <Checkbox value={area}>
                              <span className="font-medium">Area {area}</span>
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </Container>
                </div>
              ))}
            </Section>

            <Section>
              <Container>
                <Form.Item
                  label={
                    <span>
                      <h3 className="text-base font-medium">Winners</h3>
                      <span className="text-sm">How many winners?</span>
                    </span>
                  }
                  name="winners"
                >
                  <InputNumber placeholder="Winners" style={{ width: "140px" }} />
                </Form.Item>
              </Container>
            </Section>

            <SectionWithTitle title="Entries - digital download products">
              <Container>
                <Button type="primary">Select products</Button>
              </Container>
            </SectionWithTitle>

            <SectionWithTitle
              title="Entries - physical store products"
              subtitle="Leave blank if you don’t want physical products for this draw"
            >
              <Container>
                <Button type="primary">Select products</Button>
              </Container>
            </SectionWithTitle>

            <Section>
              <Container>
                <Form.Item label={"Non-qualifying orders message"} name="non_qualifying_orders_message">
                  <Input.TextArea
                    placeholder="Non-qualifying orders message"
                    maxLength={160}
                    showCount
                    type="text"
                    rows={5}
                  />
                </Form.Item>
              </Container>
            </Section>
          </div>
        </div>

        <div className="flex flex-col gap-form-item-spacing">
          <SectionWithTitle title="Digital download products (5)">
            <Container>
              <ProductRow data={{ url: "/public/images/RamanousShopifyProducts_1.png" }} />
              <ProductRow data={{ url: "/public/images/RamanousShopifyProducts_1.png" }} />
              <ProductRow data={{ url: "/public/images/RamanousShopifyProducts_1.png" }} />
              <ProductRow data={{ url: "/public/images/RamanousShopifyProducts_1.png" }} />
              <div className="flex items-center mt-form-item-spacing">
                <span className="flex gap-2 items-center cursor-pointer">
                  <PlusIcon />
                  <span className="text-primary font-medium">Add another</span>
                </span>
              </div>
            </Container>
          </SectionWithTitle>

          <SectionWithTitle title="Physical store products (5)">
            <Container>
              <ProductRow imageClassName="rounded-md" data={{ url: "/public/images/hoddie.png" }} />
              <ProductRow imageClassName="rounded-md" data={{ url: "/public/images/hoddie.png" }} />
              <ProductRow imageClassName="rounded-md" data={{ url: "/public/images/hoddie.png" }} />
              <ProductRow imageClassName="rounded-md" data={{ url: "/public/images/hoddie.png" }} />
              <div className="flex items-center mt-form-item-spacing">
                <span className="flex gap-2 items-center cursor-pointer">
                  <PlusIcon />
                  <span className="text-primary font-medium">Find another</span>
                </span>
              </div>
            </Container>
          </SectionWithTitle>
        </div>
      </div>
    </Form>
  );
};

export default Products;
const FormHeader = () => {
  return (
    <div className="flex justify-end items-center pt-2 pb-4 gap-2">
      <Button type="default">Publish</Button>
      <Button type="primary">Save draft</Button>
      <Button type="primary" danger>
        Cancel
      </Button>
    </div>
  );
};

const Section = ({ children, className = "" }) => {
  return <div className={`form-container ${className}`.trim()}>{children}</div>;
};

const Container = ({ children, divider = false }) => {
  return (
    <div className={`px-form-item-spacing ${divider ? "border-b border-whisper-gray" : ""}`.trim()}>{children}</div>
  );
};

const SectionWithTitle = ({ children, title = "", subtitle = "" }) => {
  return (
    <div>
      <div className="p-form-item-spacing border border-whisper-gray rounded-t-xl bg-background-secondary">
        <h3 className="text-base font-medium">{title}</h3>
        {subtitle && <span className="text-sm">{subtitle}</span>}
      </div>
      <div className="form-container rounded-none border border-t-transparent border-whisper-gray py-form-item-spacing">
        {children}
      </div>
    </div>
  );
};

