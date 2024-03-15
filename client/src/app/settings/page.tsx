"use client";
import React, { useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import { useUser } from "@auth0/nextjs-auth0/client";

const Settings = () => {
  const { user, error, isLoading } = useUser();
  const [showUpdate, setShowUpdate] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    let formObject: { [key: string]: FormDataEntryValue } = {};

    for (let [key, value] of (formData as any).entries()) {
      formObject[key] = value;
    }

    const response = await fetch("/api/settings", {
      method: "PUT",
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
    setShowUpdate(true);
  };

  return (
    <div className="flex">
      <LandlordSidebar active="/settings" />
      <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
        <h1>Settings</h1>
        <h2 style={{ fontSize: "1.5em" }}>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <fieldset disabled>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder={user ? user.email ?? "" : ""}
                />
              </div>
            </fieldset>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="Username"
              name="Username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Ethereum Address" className="form-label">
              Ethereum Address
            </label>
            <input
              type="text"
              className="form-control"
              id="Ethereum Address"
              name="Ethereum Address"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {showUpdate && (
          <div className="alert alert-primary" role="alert">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
