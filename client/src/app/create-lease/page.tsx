"use client";
import React, { useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";

const CreateLease = () => {
  const [tenants, setTenants] = useState([{ name: "", email: "" }]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...tenants];
    if (event.target.name === "tenantNames") {
      values[index].name = event.target.value;
    } else {
      values[index].email = event.target.value;
    }
    setTenants(values);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let formObject: { [key: string]: FormDataEntryValue[] } = {};

    for (let [key, value] of (formData as any).entries()) {
      if (String(key) === "tenantEmails" || String(key) === "tenantNames") {
        if (!formObject[key]) {
          formObject[key] = [];
        }
        formObject[key].push(value);
      } else {
        formObject[key] = value;
      }
    }

    console.log(formObject);

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

  const addTenantField = () => {
    setTenants([...tenants, { name: "", email: "" }]);
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
              name="rentalAddress"
            />
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

          <h3>Landlord Information</h3>
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
            <label htmlFor="landlordEmail" className="form-label">
              Landlord Email
            </label>
            <input
              type="text"
              className="form-control"
              id="landlordEmail"
              name="landlordEmail"
            />
          </div>

          <h3>Tenant Information</h3>
          {tenants.map((tenant, index) => (
            <div key={index}>
              <label htmlFor="tenantNames" className="form-label">
                Tenant Name
              </label>
              <input
                type="text"
                className="form-control"
                name="tenantNames"
                value={tenant.name}
                onChange={(e) => handleInputChange(index, e)}
              />
              <label htmlFor="tenantEmails" className="form-label">
                Tenant Email
              </label>
              <input
                type="email"
                className="form-control"
                name="tenantEmails"
                value={tenant.email}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary"
            onClick={addTenantField}
            style={{ margin: "10px" }}
          >
            Add Another Tenant
          </button>

          <h3>Lease Details</h3>
          <div className="mb-3">
            <label htmlFor="rentAmount" className="form-label">
              Monthly Rent
            </label>
            <input
              type="number"
              className="form-control"
              id="rentAmount"
              name="rentAmount"
              aria-describedby="rentHelp"
            />
            <div id="rentHelp" className="form-text">
              Monthly amount due in CAD
            </div>
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
