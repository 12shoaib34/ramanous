import { Form, notification } from "antd";
import React, { useEffect, useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getProducts } from "../../common/thunk";
import { Button, FormContainer, FormSectionWithTitle, Header, ProductRow, SelectProduct } from "../../components";
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

  // State for product selection modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productSelectionType, setProductSelectionType] = useState(null); // "DIGITAL" or "PHYSICAL"
  const [selectedDigitalProducts, setSelectedDigitalProducts] = useState([]);
  const [selectedPhysicalProducts, setSelectedPhysicalProducts] = useState([]);

  // Handlers for product selection modal
  const openProductModal = (type) => {
    setProductSelectionType(type);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setProductSelectionType(null); // Reset type on close
  };

  const handleProductSelect = (selectedProducts) => {
    if (productSelectionType === "DIGITAL") {
      setSelectedDigitalProducts(selectedProducts);
    } else if (productSelectionType === "PHYSICAL") {
      setSelectedPhysicalProducts(selectedProducts);
    }
    // Note: We might want to display these selected products in the UI later
    console.log(`Selected ${productSelectionType} products:`, selectedProducts);
  };

  // Handlers to clear selected products
  const handleClearDigitalProducts = () => {
    setSelectedDigitalProducts([]);
  };

  const handleClearPhysicalProducts = () => {
    setSelectedPhysicalProducts([]);
  };

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

    // Map entries: ensure first type is "DEFAULT", map boolean type to string, format dates
    const mapEntry = (entry, index) => ({
      ...entry,
      startTime: entry.startTime?.toISOString(), // Format startTime
      endTime: entry.endTime?.toISOString(), // Format endTime
      type: index === 0 ? "DEFAULT" : entry.type ? "BOOST" : "DEFAULT", // Map boolean type to string
    });

    const mappedDigitalEntries = (values?.digitalDownloadEntries || []).map(mapEntry);
    const mappedPhysicalEntries = (values?.physicalStoreEntries || []).map(mapEntry);

    // Format selected products for the payload
    const formatProductPayload = (product) => ({
      productId: product.productId,
      name: product.name,
      price: product.price, // Assuming price is already a string or needs conversion
      productType: product.productType,
    });

    const productsPayload = [
      ...selectedDigitalProducts.map(formatProductPayload),
      ...selectedPhysicalProducts.map(formatProductPayload),
    ];

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
      luckyDrawSettings: [...mappedDigitalEntries, ...mappedPhysicalEntries], // Use mapped arrays
      products: productsPayload, // Use selected products
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

    // return; // Uncomment to prevent actual dispatch during testing
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

  console.log(selectedDigitalProducts, selectedPhysicalProducts);

  return (
    <div>
      {/* Render SelectProduct Modal */}
      <SelectProduct
        open={isProductModalOpen}
        onClose={closeProductModal}
        onSelect={handleProductSelect}
        // Pass the IDs of currently selected products for the active type
        initialSelectedIds={
          productSelectionType === "DIGITAL"
            ? selectedDigitalProducts.map((p) => p.productId)
            : productSelectionType === "PHYSICAL"
            ? selectedPhysicalProducts.map((p) => p.productId)
            : [] // Default to empty array if type is somehow null
        }
      />
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
              {/* Pass openProductModal handler down */}
              <DigitalDownloadEntries
                form={form}
                openProductModal={openProductModal}
                productsSelected={selectedDigitalProducts.length > 0} // Pass selection status
                selectedProducts={selectedDigitalProducts} // Pass the actual selected products
                onClearSelection={handleClearDigitalProducts} // Pass clear handler
              />
              <PhysicalStoreEntries
                form={form}
                openProductModal={openProductModal}
                productsSelected={selectedPhysicalProducts.length > 0} // Pass selection status
                selectedProducts={selectedPhysicalProducts} // Pass the actual selected products
                onClearSelection={handleClearPhysicalProducts} // Pass clear handler
              />
              <NonQualifyingOrdersMessage form={form} />
              {/* Dynamically render selected digital products */}
              <FormSectionWithTitle title={`Digital download products (${selectedDigitalProducts.length})`}>
                <FormContainer>
                  {selectedDigitalProducts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No digital products selected.</p>
                  ) : (
                    selectedDigitalProducts.map((product) => (
                      <ProductRow key={product.productId} data={product} /> // Assuming ProductRow takes the product object
                    ))
                  )}
                  <div className="flex items-center mt-form-item-spacing">
                    {/* Update button to open modal */}
                    <Button
                      htmlType="button"
                      rounded="rounded-sm"
                      padding="pr-1"
                      icon={<PlusIcon />}
                      theme="tertiary-primary"
                      onClick={() => openProductModal("DIGITAL")}
                    >
                      {selectedDigitalProducts.length > 0 ? "Add / Edit Products" : "Select Products"}
                    </Button>
                  </div>
                </FormContainer>
              </FormSectionWithTitle>

              {/* Dynamically render selected physical products */}
              <FormSectionWithTitle title={`Physical store products (${selectedPhysicalProducts.length})`}>
                <FormContainer>
                  {selectedPhysicalProducts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No physical products selected.</p>
                  ) : (
                    selectedPhysicalProducts.map((product) => (
                      <ProductRow key={product.productId} imageClassName="rounded-md" data={product} /> // Assuming ProductRow takes the product object
                    ))
                  )}
                  <div className="flex items-center mt-form-item-spacing">
                    {/* Update button to open modal */}
                    <Button
                      htmlType="button"
                      rounded="rounded-sm"
                      padding="pr-1"
                      icon={<PlusIcon />}
                      theme="tertiary-primary"
                      onClick={() => openProductModal("PHYSICAL")}
                    >
                      {selectedPhysicalProducts.length > 0 ? "Add / Edit Products" : "Select Products"}
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
