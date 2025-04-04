import { Form, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getProducts } from "../../common/thunk";
import { Button, FormContainer, FormSectionWithTitle, Header, ProductRow } from "../../components";
import { normalizeString } from "../../utils/helper";
import DigitalDownloadEntries from "./components/DigitalDownloadEntries";
import DrawAreaDetails from "./components/DrawAreaDetails";
import DrawInitialDetails from "./components/DrawInitialDetails";
import DrawWinners from "./components/DrawWinners";
import NonQualifyingOrdersMessage from "./components/NonQualifyingOrdersMessage";
import PhysicalStoreEntries from "./components/PhysicalStoreEntries";
import SeoDetails from "./components/SeoDetails";
import { createLuckyDraw } from "../listLuckyDraw/thunk";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../icons/PlusIcon";
import dayjs from "dayjs";

const CreateLuckyDraw = (props) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCountries());
  }, [dispatch]);

  const products = useSelector((state) => state?.common?.products);
  const countriesData = useSelector((state) => state?.common?.countries);
  const luckyDraws = useSelector((state) => state?.luckyDraws);

  const handlePublish = (values) => {
    console.log("Raw form values:", values);

    const selectedCountryIds = values.countryIds || [];
    const allCountries = countriesData?.data || [];
    const formattedCountries = selectedCountryIds
      .map((countryId) => {
        const countryDetails = allCountries.find((c) => c.countryId === countryId);
        if (!countryDetails) return null;

        const normalizedName = normalizeString(countryDetails.name);
        const selectedStates = values[normalizedName] || [];

        const stateIds = selectedStates.filter((id) => typeof id === "number");

        if (stateIds.length === 0 && selectedStates.includes("all") && countryDetails.State?.length > 0) {
          // If 'all' was selected, map all available state IDs for that country
          return {
            countryId: countryDetails.countryId,
            stateIds: countryDetails.State.map((s) => s.stateId),
          };
        } else if (stateIds.length > 0) {
          return {
            countryId: countryDetails.countryId,
            stateIds: stateIds,
          };
        }

        // Skip if a country was selected but no states (and not 'all')
        return null;
      })
      .filter(Boolean);

    const { startDateTime, startTime, endDateTime, endTime } = values;

    const combinedStartDateTime =
      startDateTime && startTime
        ? dayjs(startDateTime)
            .hour(dayjs(startTime).hour())
            .minute(dayjs(startTime).minute())
            .second(dayjs(startTime).second())
        : null;

    const combinedEndDateTime =
      endDateTime && endTime
        ? dayjs(endDateTime).hour(dayjs(endTime).hour()).minute(dayjs(endTime).minute()).second(dayjs(endTime).second())
        : null;

    const payload = {
      luckyDrawName: values.luckyDrawName,
      publicName: values.publicName,

      startDateTime: combinedStartDateTime?.toISOString(),
      endDateTime: combinedEndDateTime?.toISOString(),
      timeZone: values.timeZone,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
      drawType: values.drawTypes,
      winnersCount: values.winnersCount,
      message: values.message,
      reward: values.reward,
      status: "DRAFT",

      luckyDrawSettings: [...(values?.digitalDownloadEntries || []), ...(values?.physicalStoreEntries || [])], // Added null checks
      products: [],
      countries: formattedCountries,
      isUnlimited: values.isUnlimited || false,
      entrantsCap: values.isUnlimited ? null : values.entrantsCap,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    });

    console.log("Formatted Payload:", payload);
    // dispatch(createLuckyDraw(payload))
    //   .unwrap()
    //   .then((result) => {
    //     notification.success({ message: "Lucky draw created successfully!" });
    //     navigate(`/list-lucky-draw`);
    //   })
    //   .catch((err) => {
    //     console.error("Failed to create lucky draw:", err);
    //     notification.error({ message: `Failed to create lucky draw: ${err?.message || "Unknown error"}` });
    //   });
  };

  return (
    <div>
      <Header title="Create New Lucky Draw" />
      <Form requiredMark={false} form={form} layout="vertical" onFinish={handlePublish}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 px-5 pb-2 pt-2">
          <div>
            <FormHeader loading={luckyDraws?.createLuckyDrawLoading} />
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

          <div className="flex flex-col gap-form-item-spacing">{/* <CreateNewProduct form={form} /> */}</div>
        </div>
      </Form>
    </div>
  );
};

export default CreateLuckyDraw;
const FormHeader = ({ loading }) => {
  // Pass loading state
  return (
    <div className="flex justify-end items-center pt-2 pb-4 gap-2 sticky top-[52px] left-0 z-10 bg-background">
      <Button htmlType="submit" theme="primary" loading={loading} disabled={loading}>
        {" "}
        {/* Disable button when loading */}
        Publish
      </Button>
      <Button theme="tertiary-primary">Save draft</Button>
      <Button theme="secondary" danger>
        Cancel
      </Button>
    </div>
  );
};
