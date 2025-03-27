import React from "react";
import { CustomLabel, FormContainer, FormSection, UploadListCard } from "../../../components";
import { Form, Input, Upload } from "antd";

const CreateNewProduct = ({ form }) => {
  const { Dragger } = Upload;

  const getTotalFileSize = (files) => {
    let size = files.reduce((total, file) => total + file.size, 0);

    if (size > 1024 * 1024 * 1024) return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    if (size > 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${size} b`;
  };

  const onDelete = (index) => {
    let currentFiles = form.getFieldValue("product_images");

    currentFiles.fileList.splice(index, 1);
    form.setFieldValue("product_images", currentFiles);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background-secondary mt-2 py-2 pl-2.5 pr-3">Adding New Digital Product</div>
      <FormSection>
        <FormContainer>
          <Form.Item
            label={<CustomLabel label="Name Of Digital Product" info="This will be the public viewable product name" />}
            name="product_name"
          >
            <Input placeholder="Enter product name" />
          </Form.Item>
        </FormContainer>
      </FormSection>
      <FormSection>
        <FormContainer divider>
          <Form.Item name={"product_images"}>
            <Dragger beforeUpload={() => false} showUploadList={false}>
              <div className="flex items-center justify-center h-28 w-full">
                <span className="dragger-action">Click to search or drag n drop files here</span>
              </div>
            </Dragger>
          </Form.Item>
          <Form.Item shouldUpdate>
            {({ getFieldValue }) => {
              const productImages = getFieldValue("product_images")?.fileList || [];

              return (
                <div className="grid grid-cols-2 gap-5 mb-1">
                  {productImages.map((file, index) => (
                    <UploadListCard onDelete={() => onDelete(index)} file={file} key={index} />
                  ))}
                </div>
              );
            }}
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const productImages = getFieldValue("product_images")?.fileList || [];

              return (
                <div className="my-form-item-spacing text-center font-medium text-primary">
                  Total file size ({getTotalFileSize(productImages)} of 123Gb)
                </div>
              );
            }}
          </Form.Item>
        </FormContainer>
        <FormContainer className="pt-form-item-spacing">
          <Form.Item label={<CustomLabel label="Price" info={"Only AUD for this version"} />}>
            <Input
              className="max-w-30"
              onWheel={(e) => e.target.blur()}
              prefix="AUD$"
              type="number"
              inputMode="numeric"
            />
          </Form.Item>
        </FormContainer>
      </FormSection>
    </div>
  );
};

export default CreateNewProduct;
