"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [userType, setUserType] = useState<string>(() => localStorage.getItem('userType') || '');

  useEffect(() => {
    if (user) {
      router.push(`/main?type=${userType}`); // Redirect to /main if user is logged in
    }
  }, [user, router, userType]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleButtonClick = (type: string) => {
    setUserType(type);
    localStorage.setItem('userType', type);
    console.log(type);
    router.push(`/auth/?type=${type}`);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => handleButtonClick("tenant")}>Tenant</button>
      <button onClick={() => handleButtonClick("landlord")}>Landlord</button>
    </div>
  );
};

export default IndexPage;
