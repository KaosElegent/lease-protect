"use client";
import React, { useEffect, useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Lease } from "../../interfaces/leaseInterface";
import LeaseCard from "../components/LeaseCard";

const SeeLeases = () => {
  const userType = localStorage.getItem('userType') || '';
  const { user, error, isLoading } = useUser();
  const [leases, setLeases] = useState<Lease[]>([]);

  // query for leases of the user
  const fetchLeases = async () => {
    try {
      const response = await fetch(`/api/leases?email=${user?.email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLeases(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user && leases.length === 0) {
      fetchLeases();
      console.log(leases);
    }
  }, [user]);

  return (
    <div className="flex">
      <LandlordSidebar active="/leases" userType={userType}/>
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>Your Leases</h1>
        <div className="flex">
          {leases.map((leaseData) => (
            <LeaseCard lease={leaseData} />
          ))}
        </div>
        <button
          className="btn btn-primary"
          style={{ margin: 20 }}
          onClick={fetchLeases}
        >
          Refresh
        </button>
        <a href="/create-lease" className="btn btn-primary">
          Add New Lease
        </a>
      </div>
    </div>
  );
};

export default SeeLeases;

{
  /* <ul>
          {users.map((user) => (
            <li key={user._id}>
              <h2>{user.username}</h2>
              <p>{user.fName}</p>
            </li>
          ))}
        </ul> */
}
