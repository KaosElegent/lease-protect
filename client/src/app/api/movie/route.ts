import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextResponse } from 'next/server';

export async function GET(req :Request) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const year = urlParams.get('year')
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find(year ? {year: Number(year)} : {})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
    }
}
//