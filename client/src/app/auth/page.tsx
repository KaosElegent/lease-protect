"use client";
// pages/auth.tsx
import React from "react";
import { useSearchParams } from "next/navigation";
import { type NextRequest } from 'next/server'
import Link from "next/link";

const Auth: React.FC = () => {
  const type = useSearchParams().get("type");

  return (
    <div >
        <h1>Hello</h1>
        <h1>{type === 'tenant' ? 'Tenant' : 'Landlord'} Authentication Page</h1>

        <Link
          key="login"
          href="/api/auth/login"
        >
        <p>LogIn</p>
        </Link>
    </div>
  );
};

export default Auth;