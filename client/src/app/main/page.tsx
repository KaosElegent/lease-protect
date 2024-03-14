"use client";
import { Movie } from "../../../mongodb/getMovies";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";
import LandlordSidebar from "../components/LandlordSidebar";

const MainPage: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/movie" + '?year=1903');
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="flex">
      <LandlordSidebar />
      <h2>Welcome {user?.name}</h2>
      <p>Your email address is: {user?.email}</p>
      <Link key="logout" href="/api/auth/logout">
        <p>Log Out</p>
      </Link>
      <ul>
        {movies.map((movie) => (
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
