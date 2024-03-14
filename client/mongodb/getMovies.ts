// lib/getMovies.ts

import clientPromise from "./mongodb";
import { GetServerSideProps } from 'next';

export interface Movie {
   _id: string;
   title: string;
   metacritic: number;
   plot: string;
}

export const getMovies: GetServerSideProps = async () => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");
       const movies = await db
           .collection("movies")
           .find({})
           .sort({ metacritic: -1 })
           .limit(20)
           .toArray();
       return {
           props: { movies: JSON.parse(JSON.stringify(movies)) },
       };
   } catch (e) {
       console.error(e);
       return { props: { movies: [] } };
   }
};
