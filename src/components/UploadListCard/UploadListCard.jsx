import React, { useMemo, useEffect } from "react";
import Button from "../Button/Button";
import DeleteIcon from "../../icons/DeleteIcon";

const UploadListCard = ({ file, imageUrl = "", onDelete = () => {} }) => {
  console.log(file);

  const base64Url = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file?.originFileObj);
    }
    return imageUrl;
  }, [file]);

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(base64Url);
      }
    };
  }, [file, base64Url]);

  return (
    <div className="flex items-center gap-2.5 shadow-soft-black py-2 pl-2.5 pr-3 rounded-xl">
      <img
        className="w-15 h-15 object-cover rounded-md bg-gray-100"
        src={base64Url}
        alt={file?.name || "Uploaded file"}
      />
      <span className="word-break line-clamp-2 font-medium text-primary">{file?.name || "No file name"}</span>
      <Button className="ml-auto" onClick={onDelete} theme="light" size="fit" shape="circle">
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default UploadListCard;
