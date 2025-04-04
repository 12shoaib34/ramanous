import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spin, Alert } from "antd"; // Removed List and Button from antd
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button"; // Import custom Button
// Corrected thunk import based on slice.js
import { getProducts } from "../../common/thunk";
// Assuming the slice name is 'common' and products are stored under 'products'
// You might need to adjust the selector based on src/common/slice.js
const selectProductsData = (state) => state.common.products;

// Accept initialSelectedIds prop, default to empty array
const SelectProduct = ({ open, onClose, onSelect, initialSelectedIds = [] }) => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(selectProductsData);
  const [selectedProductIds, setSelectedProductIds] = useState([]); // State to hold multiple IDs

  useEffect(() => {
    // Fetch products when the modal is opened and data isn't already loaded
    if (open && !products?.length) {
      dispatch(getProducts()); // Corrected dispatch call
    }
    // Effect to initialize selection when modal opens
    if (open) {
      setSelectedProductIds(initialSelectedIds);
    }
    // We don't reset here on close (open=false) because handleClose already does.
    // Adding initialSelectedIds to dependency array ensures state updates if the prop changes while modal is open (unlikely but safe).
  }, [open, dispatch, products, initialSelectedIds, setSelectedProductIds]);

  const handleSelect = () => {
    // Find all products whose IDs are in the selectedProductIds array
    const selectedProducts = products.filter((p) => selectedProductIds.includes(p.productId));
    if (selectedProducts.length > 0) {
      onSelect(selectedProducts); // Pass the array of selected product objects
      handleClose(); // Close after selection
    }
  };

  const handleClose = () => {
    setSelectedProductIds([]); // Reset selection array on close
    onClose();
  };

  // Memoized click handler for list items for multiple selection
  const handleItemClick = useCallback(
    (productId) => {
      setSelectedProductIds((prevSelectedIds) => {
        // Check if the ID is already selected
        if (prevSelectedIds.includes(productId)) {
          // If yes, remove it (filter it out)
          return prevSelectedIds.filter((id) => id !== productId);
        } else {
          // If no, add it to the array
          return [...prevSelectedIds, productId];
        }
      });
    },
    [setSelectedProductIds] // Dependency: only recreate if setSelectedProductIds changes
  );

  return (
    <Modal
      title="Select Product"
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key="back" theme="light" onClick={handleClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          loading={loading}
          onClick={handleSelect}
          disabled={selectedProductIds.length === 0} // Disable button if no products are selected
        >
          {/* Conditionally render button text */}
          {selectedProductIds.length > 0 ? `${selectedProductIds.length} Selected` : "Select"}
        </Button>,
      ]}
      width={600} // Adjust width as needed
    >
      {loading && (
        <div className="text-center p-4">
          <Spin />
        </div>
      )}
      {error && (
        <Alert
          message="Error loading products"
          description={error.message || "Could not fetch products."}
          type="error"
          showIcon
          className="mb-4"
        />
      )}
      {!loading && !error && products && (
        <div className="max-h-96 overflow-y-auto rounded">
          {" "}
          {/* Container for custom list */}
          {products.map((item) => (
            <div
              key={item.productId}
              onClick={() => handleItemClick(item.productId)} // Use the memoized handler
              // Update className to check if ID is included in the array
              className={`flex justify-between items-center p-3 cursor-pointer border-b last:border-b-0 hover:bg-green-50/50 ${
                selectedProductIds.includes(item.productId) ? "bg-green-50/50 border-green-200" : "border-gray-100"
              }`}
            >
              <div>
                {" "}
                {/* Container for title and description */}
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">
                  Type: {item.productType} - Price: ${item.price}
                </div>
              </div>
              {/* Show checkmark if ID is included in the array */}
              {selectedProductIds.includes(item.productId) && (
                /* Green Checkmark SVG */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 ml-2" /* Added ml-2 for spacing */
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true" /* Added for accessibility */
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
      {!loading && !error && !products?.length && (
        <div className="text-center p-4 text-gray-500">No products found.</div>
      )}
    </Modal>
  );
};

export default SelectProduct;
