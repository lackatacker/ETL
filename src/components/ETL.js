import React, { useCallback, useEffect, useState } from "react";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DataTable from "./DataTable";
import Papa from "papaparse";
import OperationButton from "./OperationButton";
import { saveData, getTransformationBlocks, transformData } from "./api";
import "./style.css";

const ETLPage = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [transformationBlocks, setTransformationBlocks] = useState([]);
  const [showTransformedData, setShowTransformedData] = useState(false);
  const [transformedData, setTransformedData] = useState([]);

  const handleTransformButton = async (operation) => {
    const transformed = await transformData(operation, uploadedData);
    if (transformed) {
      setTransformedData(transformed);
      setShowTransformedData(true); // Show the transformed data DataTable
    }
  };
  const handleButtonDrop = (operation) => {
    console.log("Button dropped with operation:", operation);
  };

  useEffect(() => {
    const fetchTransformationBlocks = async () => {
      const blocks = await getTransformationBlocks();
      setTransformationBlocks(blocks);
    };

    fetchTransformationBlocks();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target.result;
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (parsedData) => {
            setUploadedData(parsedData.data);
            setShowButtons(true); // Show buttons when data is uploaded
          },
        });
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        ETL Tool - Transform Your Data
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
        <div
          {...getRootProps()}
          style={{ border: "2px dashed gray", padding: "20px" }}
        >
          <input {...getInputProps()} />
          <Typography variant="subtitle1">
            Drag and drop a CSV file here
          </Typography>
        </div>
      </Paper>
      {uploadedData.length > 0 && (
        <DataTable data={uploadedData} onDrop={handleButtonDrop} />
      )}
      {showButtons && (
        <div
          style={{ marginTop: "20px", textAlign: "center" }}
          className="button-container"
        >
          {transformationBlocks.map((block) => (
            <OperationButton
              key={block.id}
              onClick={() => handleTransformButton(block.operation)}
              label={block.label}
              operation={block.operation}
              onDrop={() => handleButtonDrop(block.operation)}
            />
          ))}
          <br />
          <br />
          <Button onClick={() => saveData(uploadedData)} variant="outlined">
            Save
          </Button>
          <Button onClick={() => {}} variant="outlined">
            Edit Operations
          </Button>
          <Button
            onClick={() => setShowTransformedData(!showTransformedData)}
            variant="outlined"
          >
            {showTransformedData
              ? "Hide Transformed Data"
              : "Show Transformed Data"}
          </Button>
        </div>
      )}
      {showTransformedData && transformedData.length > 0 && (
        <DataTable data={transformedData} />
      )}
    </Container>
  );
};

export default ETLPage;
