'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Movie } from '../../../mongodb/getMovies'
import Link from 'next/link';


const MainPage: React.FC = () => {
 const { user, error, isLoading } = useUser();
 const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/movie');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
        <h2>Welcome {user?.name}</h2>
        <p>Your email address is: {user?.email}</p>
        <Link
          key="logout"
          href="/api/auth/logout"
        >
        <p>Log Out</p>
        </Link>
        <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.plot}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
