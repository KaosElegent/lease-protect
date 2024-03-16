"use client";
import React, { useEffect, useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "../../interfaces/userInterface";
import RentCard from "../components/RentCard";
import { useRouter } from "next/navigation";
import {load} from "../../funcs";


const SeeUsers = () => {
  const userType = localStorage.getItem('userType') || '';
  const { user, error, isLoading } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [contract, setContract] = React.useState<any>(null);
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const router = useRouter();
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
 console.log(users);
  // query for users of the user
  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/payers?email=${user?.email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    console.log(await contract.payRent(hash,
        formData.get("rentAmount"),
        {from: addressAccount}));
        setRefresh(true);

    const response = await fetch("/api/payers", {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({email: formData.get('email'), landlordEmail: user?.email}),
    });
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }
    
    console.log(await contract.payRent(hash,
        formData.get("rentAmount"),
        {from: addressAccount}));
        setRefresh(true);

    router.back();
  
  }

  useEffect(() => {
    if (user && users.length === 0) {
      fetchUsers();
      console.log(users);
    }
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setContract(e.todoContract);
    });
  }, [user]);

  return (
    <div className="flex">
      <LandlordSidebar active="/confirmrent" userType={userType}/>
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>People you've received rent from</h1>
        <div className="flex">
          {users.map((userData) => (
            <RentCard rent={userData} />
          ))}
        </div>
        <button
          className="btn btn-primary"
          style={{ margin: 20 }}
          onClick={fetchUsers}
        >
          Refresh
        </button>

    <form onSubmit={submitHandler}>
        <label htmlFor="email" className="form-label">
            Tenant Email
        </label>
        <input type="text" className="form-control" id="email" name="email" />
        <button type="submit" className="btn btn-primary">
            Confirm Rent
          </button>
    </form>
        
      </div>
    </div>
  );
};

export default SeeUsers;

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
