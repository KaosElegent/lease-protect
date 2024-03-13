'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const MainPage: React.FC = () => {
 const { user, error, isLoading } = useUser();
  return (
    <div>
      <h1>Welcome! {user?.name}</h1>
      {/* <a href="/api/auth/logout">Logout</a> couldn't make it work - I guess GET method to /v2/logout endpoint is necessary*/}
    </div>
  );
};

export default MainPage;