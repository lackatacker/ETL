const transactionUrl = "http://localhost:8000/api/transactions/";
const transformationBlockUrl = "http://localhost:8000/api/transformationBlock/";
const processUrl = "http://localhost:8000/api/process/";

const saveData = async (data) => {
  try {
    console.log(JSON.stringify(data));
    const response = await fetch(transactionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Data saved successfully
      console.log("Data saved successfully");
      return true;
    } else {
      // Handle error response
      console.error("Error saving data");
      return false;
    }
  } catch (error) {
    console.error("-----Error:-----------", error);
    return false;
  }
};

const getTransformationBlocks = async () => {
  try {
    const response = await fetch(transformationBlockUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const blocks = await response.json();
      console.log("Transformation blocks:", blocks);
      return blocks;
    } else {
      // Handle error response
      console.error("Error fetching transformation blocks");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const transformData = async (operation, data) => {
  try {
    const response = await fetch(processUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ operation, transactions: data }),
    });

    if (response.ok) {
      const transformedData = await response.json();
      console.log("Transformed data:", transformedData);
      return transformedData;
    } else {
      // Handle error response
      console.error("Error transforming data");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export { saveData, getTransformationBlocks, transformData };
