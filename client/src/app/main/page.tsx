"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import LandlordSidebar from "../components/LandlordSidebar";
import { useSearchParams } from "next/navigation";

import { User } from "../../interfaces/userInterface";

const MainPage: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const type = useSearchParams().get("type");

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const response = await fetch(
            `/api/user?email=${user.email}&name=${user.name}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [user]);

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
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="flex">
      <LandlordSidebar active="/" />
      <div className="flex flex-col w-full">
        <h2>Welcome {user?.name}</h2>
        <p>Your email address is: {user?.email}</p>
        <button onClick={handleAddUser}>add user</button>
        {/* <ul>
          {users.map((user) => (
            <li key={user._id}>
              <h2>{user.username}</h2>
              <p>{user.fName}</p>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default MainPage;
