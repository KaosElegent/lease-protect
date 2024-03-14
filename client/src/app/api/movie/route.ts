import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextResponse } from 'next/server';

export async function GET(req :Request) {
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
    }
}