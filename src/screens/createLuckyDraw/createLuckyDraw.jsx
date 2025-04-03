import { Form } from "antd";
import React from "react";
import { Button, FormContainer, FormSectionWithTitle, Header, ProductRow } from "../../components";
import PlusIcon from "../../icons/PlusIcon";
import CreateNewProduct from "./components/CreateNewProduct";
import DigitalDownloadEntries from "./components/DigitalDownloadEntries";
import DrawAreaDetails from "./components/DrawAreaDetails";
import DrawInitialDetails from "./components/DrawInitialDetails";
import DrawWinners from "./components/DrawWinners";
import NonQualifyingOrdersMessage from "./components/NonQualifyingOrdersMessage";
import PhysicalStoreEntries from "./components/PhysicalStoreEntries";
import SeoDetails from "./components/SeoDetails";

const CreateLuckyDraw = (props) => {
  const [form] = Form.useForm();

  const [activeTab, setActiveTab] = React.useState("CURRENT_DRAWS");

  return (
    <div>
      <Header title="Create New Lucky Draw" />
      <Form requiredMark={false} form={form} layout="vertical">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-5 pb-2 pt-2">
          <div>
            <FormHeader />
            <div className="flex flex-col gap-form-item-spacing">
              <DrawInitialDetails form={form} />
              <SeoDetails form={form} />
              <DrawAreaDetails form={form} />
              <DrawWinners form={form} />
              <DigitalDownloadEntries form={form} />
              <PhysicalStoreEntries form={form} />
              <NonQualifyingOrdersMessage form={form} />
              <FormSectionWithTitle title="Digital download products (5)">
                <FormContainer>
                  <ProductRow data={{ url: "/images/RamanousShopifyProducts_1.png" }} />
                  <ProductRow data={{ url: "/images/RamanousShopifyProducts_1.png" }} />
                  <ProductRow data={{ url: "/images/RamanousShopifyProducts_1.png" }} />
                  <ProductRow data={{ url: "/images/RamanousShopifyProducts_1.png" }} />

                  <div className="flex items-center mt-form-item-spacing">
                    <Button rounded="rounded-sm" padding="pr-1" icon={<PlusIcon />} theme="tertiary-primary">
                      Add another
                    </Button>
                  </div>
                </FormContainer>
              </FormSectionWithTitle>

              <FormSectionWithTitle title="Physical store products (5)">
                <FormContainer>
                  <ProductRow imageClassName="rounded-md" data={{ url: "/images/hoodie.png" }} />
                  <ProductRow imageClassName="rounded-md" data={{ url: "/images/hoodie.png" }} />
                  <ProductRow imageClassName="rounded-md" data={{ url: "/images/hoodie.png" }} />
                  <ProductRow imageClassName="rounded-md" data={{ url: "/images/hoodie.png" }} />
                  <div className="flex items-center mt-form-item-spacing">
                    <Button rounded="rounded-sm" padding="pr-1" icon={<PlusIcon />} theme="tertiary-primary">
                      Find another
                    </Button>
                  </div>
                </FormContainer>
              </FormSectionWithTitle>
            </div>
          </div>

          <div className="flex flex-col gap-form-item-spacing">
            <CreateNewProduct form={form} />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateLuckyDraw;
const FormHeader = () => {
  return (
    <div className="flex justify-end items-center pt-2 pb-4 gap-2 sticky top-[52px] left-0 z-10 bg-background">
      <Button htmlType="submit" theme="primary">
        Publish
      </Button>
      <Button theme="tertiary-primary">Save draft</Button>
      <Button theme="secondary" danger>
        Cancel
      </Button>
    </div>
  );
};
