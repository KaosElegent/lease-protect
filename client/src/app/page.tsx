'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const handleButtonClick = (userType: string) => {
    router.push(`/auth/?type=${userType}`);
  };
  
  if (user) {
    router.push('/main'); // Redirect to /main if user is logged in
    return null; // Or show loading screen
  } else {
  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => handleButtonClick('tenant')}>Tenant</button>
      <button onClick={() => handleButtonClick('landlord')}>Landlord</button>
    </div>
  );
  }
};

export default IndexPage;



