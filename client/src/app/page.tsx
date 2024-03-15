"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [userType, setUserType] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('userType') || '' : ''));

  useEffect(() => {
    if (user) {
      router.push(`/main?type=${userType}`); // Redirect to /main if user is logged in
    }
  }, [user, router, userType]);

  const handleButtonClick = (type: string) => {
    setUserType(type);
    localStorage.setItem('userType', type);
    router.push(`/auth/?type=${type}`);
  };

  return (
    <div className="bg-primary d-flex align-items-center justify-content-center vh-100">
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 text-center text-white bg-primary p-3">Loading...</div>
      )}
      <div className="text-center text-white">
        <h1>Welcome!</h1>
        <div className="btn-group mt-3" role="group" aria-label="User Type Buttons">
          <button type="button" className="btn btn-light" onClick={() => handleButtonClick("tenant")}>Tenant</button>
          <button type="button" className="btn btn-light" onClick={() => handleButtonClick("landlord")}>Landlord</button>
        </div>
      </div>
      {error && (
        <div className="position-fixed top-0 start-0 w-100 text-center text-white bg-danger p-3">{error.message}</div>
      )}
    </div>
  );
};

export default IndexPage;

