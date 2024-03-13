'use client'
// pages/auth.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { type NextRequest } from 'next/server'

const Auth: React.FC = () => {
  const router = useRouter();
 console.log(router)
  // Render your login/signup components based on the user type
  return (
    <div>
        <h1>AUTHENTICATED!!!!!!!!!!</h1>
        {/* <h1>{type === 'tenant' ? 'Tenant' : 'Landlord'} Authentication Page</h1> */}
      {/* Render your login/signup components here */}
    </div>
  );
};