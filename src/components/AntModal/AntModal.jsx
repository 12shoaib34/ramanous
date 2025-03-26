import React from "react";
import { Modal } from "antd";

const AntModal = ({ open = false, onClose = () => {}, width = "auto" || 500, padding = "p-5", children }) => {
  return (
    <Modal width={width} closeIcon={null} footer={false} open={open} onCancel={onClose}>
      <div className={`${padding}`}>{children}</div>
    </Modal>
  );
};

export default AntModal;
