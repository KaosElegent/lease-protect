import LandlordSidebar from "@/app/components/LandlordSidebar";
import React from "react";

const Messages = () => {
  const userType = localStorage.getItem('userType') || '';
  return (
    <div className="flex">
      <LandlordSidebar active="/messages" userType={userType}/>
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>Messages</h1>
      </div>
    </div>
  );
};

export default Messages;
