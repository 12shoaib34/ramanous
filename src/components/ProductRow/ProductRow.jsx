import { Button } from "antd";
import React from "react";
import DeleteIcon from "../../icons/DeleteIcon";
import PencilIcon from "../../icons/PencilIcon";
import PropTypes from "prop-types";

const ProductRow = (props) => {
  const { onDelete = () => {}, onEdit = () => {}, imageClassName = "", data = {} } = props;

  return (
    <div className="flex items-center justify-between border-b border-whisper-gray">
      <div className="flex items-center gap-4">
        <img className={`w-12 h-12 min-w-12 object-cover ${imageClassName}`.trim()} src={data?.url} alt="" />
        <h3 className="text-sm font-medium">20 Entry Pack + 1x Digital Downloads</h3>
      </div>
      <div className="flex items-center">
        <Button onClick={onEdit} size="small" type="link" shape="circle" icon={<PencilIcon />} />
        <Button onClick={onDelete} size="small" type="link" shape="circle" icon={<DeleteIcon />} />
      </div>
    </div>
  );
};

ProductRow.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  imageClassName: PropTypes.string,
  data: PropTypes.object,
};

export default ProductRow;
