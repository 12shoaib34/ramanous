import { Button } from "antd";
import React from "react";

const Products = (props) => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <div className="flex justify-end items-center py-2 gap-2">
          <Button type="default">Publish</Button>
          <Button type="primary">Save draft</Button>
          <Button type="primary" danger>
            Cancel
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Products;
