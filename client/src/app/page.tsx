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
    <div className="bg-primary d-flex flex-column align-items-center justify-content-center vh-100 animate-slide-up">
      {isLoading && (
        <div className="position-fixed top-0 start-0 w-100 text-center text-white bg-primary p-3">Loading...</div>
      )}
      <div className="text-center text-white mb-5">
        <h1>Welcome!</h1>
      </div>
      <div className="text-center text-white">
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <button
              type="button"
              className="btn btn-light w-100 mb-3"
              onClick={() => handleButtonClick("tenant")}
            >
              <span className="d-block">Tenant</span>
            </button>
          </div>
          <div className="col-sm-6">
            <button
              type="button"
              className="btn btn-light w-100 mb-3"
              onClick={() => handleButtonClick("landlord")}
            >
              <span className="d-block">Landlord</span>
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="position-fixed top-0 start-0 w-100 text-center text-white bg-danger p-3">{error.message}</div>
      )}
    </div>
  );  
};

export default IndexPage;

