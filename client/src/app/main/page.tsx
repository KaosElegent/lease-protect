'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { GetServerSideProps } from 'next';


const MainPage: React.FC = () => {
 const { user, error, isLoading } = useUser();
  return (
    <div>
        <h2>Welcome {user?.name}</h2>
        <p>Your email address is: {user?.email}</p>
        <a href="/api/auth/logout">Log Out</a>
    </div>
  );
};

export default MainPage;
