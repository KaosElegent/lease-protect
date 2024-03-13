'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

const IndexPage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = (userType: string) => {
    router.push(`/auth/?type=${userType}`);
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <button onClick={() => handleButtonClick('tenant')}>Tenant</button>
      <button onClick={() => handleButtonClick('landlord')}>Landlord</button>
    </div>
  );
};

export default IndexPage;



