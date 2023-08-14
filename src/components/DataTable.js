import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const DataTable = ({ data, onDrop }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const operation = event.dataTransfer.getData("operation");
    console.log("Dropped Operation:", operation);
  };
  return (
    <TableContainer
      component={Paper}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <Table>
        <TableHead>
          <TableRow>
            {/* Define table header cells */}
            {Object.keys(data[0]).map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through data and create table rows */}
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
