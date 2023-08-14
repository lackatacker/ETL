import React from "react";
import Button from "@mui/material/Button";
import "./style.css";
const OperationButton = ({ onClick, label, operation }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("operation", operation);
  };
  return (
    <Button
      variant="contained"
      draggable="true"
      color="secondary"
      onClick={onClick}
      className="operation-button"
      onDragStart={handleDragStart}
    >
      {label}
    </Button>
  );
};

export default OperationButton;
