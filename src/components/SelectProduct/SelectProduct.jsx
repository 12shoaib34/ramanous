import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spin, Alert } from "antd"; // Removed List and Button from antd
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button"; // Import custom Button
// Corrected thunk import based on slice.js
import { getProducts } from "../../common/thunk";
// Assuming the slice name is 'common' and products are stored under 'products'
// You might need to adjust the selector based on src/common/slice.js
const selectProductsData = (state) => state.common.products;

const SelectProduct = ({ open, onClose, onSelect }) => {
  const dispatch = useDispatch();
  const { data: products, loading, error } = useSelector(selectProductsData);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Fetch products when the modal is opened and data isn't already loaded
    if (open && !products?.length) {
      dispatch(getProducts()); // Corrected dispatch call
    }
  }, [open, dispatch, products]);

  const handleSelect = () => {
    const selectedProduct = products.find((p) => p.productId === selectedProductId);
    if (selectedProduct) {
      onSelect(selectedProduct); // Pass the whole selected product object
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedProductId(null); // Reset selection on close
    onClose();
  };

  // Memoized click handler for list items
  const handleItemClick = useCallback(
    (productId) => {
      setSelectedProductId((prevSelectedId) => {
        // If the clicked item is already selected, unselect it (set to null)
        if (prevSelectedId === productId) {
          return null;
        }
        // Otherwise, select the clicked item
        return productId;
      });
    },
    [setSelectedProductId]
  ); // Dependency: only recreate if setSelectedProductId changes (which it shouldn't)

  return (
    <Modal
      title="Select Product"
      open={open}
      onCancel={handleClose}
      footer={[
        <Button key="back" theme="light" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" loading={loading} onClick={handleSelect} disabled={!selectedProductId}>
          Select
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
              className={`flex justify-between items-center p-3 cursor-pointer border-b last:border-b-0 hover:bg-green-50/50 ${
                selectedProductId === item.productId ? "bg-green-50/50 border-green-200" : "border-gray-100"
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
              {selectedProductId === item.productId && (
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
