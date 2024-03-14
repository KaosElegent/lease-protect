"use client";
// pages/auth.tsx
import React from "react";
import { useSearchParams } from "next/navigation";
import { type NextRequest } from 'next/server'


const Auth: React.FC = () => {
  const type = useSearchParams().get("type");

  return (
    <div>
        <h1>Hello</h1>
        <h1>{type === 'tenant' ? 'Tenant' : 'Landlord'} Authentication Page</h1>

        <a href="/api/auth/login">Login</a>
    </div>
  );
};

export default Auth;