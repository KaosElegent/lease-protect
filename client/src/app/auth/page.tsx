"use client";
// pages/auth.tsx
import React from "react";
import styles from './auth.module.css'
import { useSearchParams } from "next/navigation";
import { type NextRequest } from 'next/server'
import Link from "next/link";
import LandlordSidebar from "../components/LandlordSidebar";

const Auth: React.FC = () => {
  const type = useSearchParams().get("type");

  return (
    <div className="bg-darknavy min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1 text-center text-white mb-4 animate-slide-up">Hello</h1>
        <h2 className="text-center text-white mb-4">{type === 'tenant' ? 'Tenant' : 'Landlord'} Authentication Page</h2>
        <div className="text-center">
          <Link href="/api/auth/login">
            <button className="btn btn-outline-light btn-lg">Log In</button>
          </Link>
        </div>
    </div>
  );
};

export default Auth;