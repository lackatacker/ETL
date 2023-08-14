import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { getTransformationBlocks, updateOperationPercentage } from "./api"; // Import your API functions

const editOperations = () => {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchOperations = async () => {
      const operations = await getTransformationBlocks();
      setOperations(operations);
    };

    fetchOperations();
  }, []);

  const handlePercentageChange = async (operationId, newPercentage) => {
    await updateOperationPercentage(operationId, newPercentage);
    // Refresh the operations list after updating
    fetchOperations();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Operations
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", textAlign: "center" }}>
        <ul>
          {operations.map((operation) => (
            <li key={operation.id}>
              {operation.label} - {operation.operation}
              <TextField
                type="number"
                value={operation.percentage}
                onChange={(e) =>
                  handlePercentageChange(operation.id, e.target.value)
                }
              />
            </li>
          ))}
        </ul>
      </Paper>
      <Button component={Link} to="/etl" variant="outlined">
        Back to ETL
      </Button>
    </Container>
  );
};

export default editOperations;
