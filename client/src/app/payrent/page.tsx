"use client";
import React, { useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import { useRouter } from "next/navigation";
import {load, makePayment} from "../../funcs";

const CreateLease = () => {
  const userType = localStorage.getItem('userType') || '';
  const router = useRouter();
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  //const scdata = load();

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setContract(e.todoContract);
    });
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //console.log(await scdata);
    const formData = new FormData(event.currentTarget);

    console.log(formData.get("rentAmount"));
    console.log(contract);
    console.log(await contract.payRent("0x3fd54831f488a22b28398de0c567a3b064b937f54f81739ae9bd545967f3abab",
            formData.get("rentAmount"),
            {from: addressAccount}));
            setRefresh(true);
    //router.back();
  };

  return (
    <div className="flex">
      <LandlordSidebar active="/create-lease" userType={userType}/>
      <div style={{ flexDirection: "column", padding: "20px" }}>
        <h1>Pay Rent</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rentAmount" className="form-label">
              Rent Period
            </label>
            <input
              type="number"
              className="form-control"
              id="rentAmount"
              name="rentAmount"
              aria-describedby="rentHelp"
            />
            <div id="rentHelp" className="form-text">
              Number of Months
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLease;
