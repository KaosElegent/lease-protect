"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import LandlordSidebar from "../components/LandlordSidebar";
import { useSearchParams } from "next/navigation";
import { User } from "../../interfaces/userInterface";
import TenantSidebar from "../components/TenantSidebar";

const MainPage: React.FC = () => {
  const userType = localStorage.getItem('userType') || '';
  const { user, error, isLoading } = useUser() ;
  const [users, setUsers] = useState<User[]>([]);
  const type = useSearchParams().get("type");


  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: type,
          email: user?.email,
          fName: user?.name,
          lName: "",
          username: "",
          ethAddress: "",
          leaseIDs: [],
          popIDs: [],
          payerIDs: [],
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    handleAddUser();
  }, [user]);

  return (
    <div className="flex">
      {type === "landlord" ? 
        <LandlordSidebar active="/" landlordUser={user}/> :
        <TenantSidebar active="/" tenantUser={user}/>}
      <div className="flex container flex-col w-full">
      <div className="text-center text-black mb-5">
        <h1>Welcome!</h1>
      </div>
      </div>
    </div>
  );
};

export default MainPage;
