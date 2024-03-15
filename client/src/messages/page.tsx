import LandlordSidebar from "@/app/components/LandlordSidebar";
import React from "react";

const Messages = () => {
  return (
    <div>
      <LandlordSidebar active="/messages" />
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>Messages</h1>
      </div>
    </div>
  );
};

export default Messages;
