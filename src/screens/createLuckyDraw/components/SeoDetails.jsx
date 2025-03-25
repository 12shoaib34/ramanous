import React from "react";
import { FormContainer, FormSection } from "../../../components";
import { Form, Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const SeoDetails = (props) => {
  const { form } = props;

  const onUploadMetaImage = (file) => {
    form.setFieldValue("meta_image", file);
    return false;
  };

  return (
    <FormSection>
      <FormContainer>
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
      </FormContainer>
    </FormSection>
  );
};

export default SeoDetails;
