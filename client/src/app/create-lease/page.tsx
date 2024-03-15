"use client";
import React from "react";
import LandlordSidebar from "../components/LandlordSidebar";

const CreateLease = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let formObject: { [key: string]: FormDataEntryValue } = {};

    for (let [key, value] of (formData as any).entries()) {
      formObject[key] = value;
    }

    const response = await fetch("/api/leases", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(formObject),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex">
      <LandlordSidebar active="/create-lease" />
      <div style={{ flexDirection: "column", padding: "20px" }}>
        <h1>Create Lease</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rentalAddress" className="form-label">
              Unit Address
            </label>
            <input
              type="text"
              className="form-control"
              id="rentalAddress"
              aria-describedby="addressHelp"
              name="rentalAddress"
            />
            <div id="addressHelp" className="form-text">
              Enter the address of the rental unit
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input type="text" className="form-control" id="city" name="city" />
          </div>
          <div className="mb-3">
            <label htmlFor="postalcode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              className="form-control"
              id="postalcode"
              name="postalcode"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="province" className="form-label">
              Province
            </label>
            <select className="form-control" id="province" name="province">
              <option value="">Select a province</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="landlordName" className="form-label">
              Landlord Name
            </label>
            <input
              type="text"
              className="form-control"
              id="landlordName"
              name="landlordName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tenantName" className="form-label">
              Tenant Name
            </label>
            <input
              type="text"
              className="form-control"
              id="tenantName"
              name="tenantName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rentAmount" className="form-label">
              Monthly Rent
            </label>
            <input
              type="number"
              className="form-control"
              id="rentAmount"
              name="rentAmount"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Lease Start Date
            </label>
            <input type="date" className="form-control" id="startDate" />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              Lease End Date
            </label>
            <input type="date" className="form-control" id="endDate" />
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