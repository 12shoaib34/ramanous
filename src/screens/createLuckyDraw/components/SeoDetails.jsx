import React from "react";
import { FormContainer, FormSection, Button } from "../../../components";
import { Form, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import DeleteIcon from "../../../icons/DeleteIcon";

const SeoDetails = (props) => {
  const { form } = props;

  const onUploadMetaImage = (file) => {
    form.setFieldValue("metaImage", file);
    return false;
  };

  return (
    <FormSection>
      <FormContainer>
        <Form.Item
          rules={[{ required: true, message: "Please input meta title" }]}
          className="input-max-w-base"
          label="Meta title"
          name="metaTitle"
        >
          <Input placeholder="Meta title" type="text" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input meta description" }]}
          label="Meta description"
          name="metaDescription"
        >
          <Input.TextArea placeholder="Meta description" maxLength={160} showCount type="text" rows={5} />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const metaImage = getFieldValue("metaImage");
            const url = metaImage ? URL.createObjectURL(metaImage) : "";

            const handleDelete = (e) => {
              e.stopPropagation();
              form.setFieldValue("metaImage", null);
            };

            return (
              <Form.Item
                rules={[{ required: true, message: "Please upload meta image" }]}
                className="input-max-w-base"
                label="Meta image"
                name="metaImage"
              >
                <ImgCrop aspect={290 / 105}>
                  <Upload.Dragger
                    showUploadList={false}
                    beforeUpload={onUploadMetaImage}
                    maxCount={1}
                    style={{ width: "max-content", padding: 0 }}
                    disabled={!!metaImage}
                    className="relative group"
                  >
                    <div style={{ width: 290, height: 105 }} className="flex items-center justify-center">
                      {metaImage ? (
                        <>
                          <img src={url} alt="Meta Preview" className="w-full h-full object-contain" />

                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              theme="tertiary-primary"
                              shape="circle"
                              icon={<DeleteIcon />}
                              onClick={handleDelete}
                              size="small"
                            ></Button>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col justify-center items-center h-full">
                          <span className="text-sm">Upload an image</span>
                          <span className="text-xs text-gray-500">(290x105 recommended)</span>
                        </div>
                      )}
                    </div>
                  </Upload.Dragger>
                </ImgCrop>
              </Form.Item>
            );
          }}
        </Form.Item>
      </FormContainer>
    </FormSection>
  );
};

export default SeoDetails;
