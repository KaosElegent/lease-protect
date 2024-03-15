import React from "react";
import LandlordSidebar from "../components/LandlordSidebar";

const CreateContract = () => {
  return (
    <div className="flex">
      <LandlordSidebar active="/create-contract" />
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>Create Contract</h1>
      </div>
    </div>
  );
};

export default CreateContract;
