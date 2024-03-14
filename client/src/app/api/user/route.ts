import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextResponse } from 'next/server';

export async function GET(req :Request) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const email = urlParams.get('email')
        const client = await clientPromise;
        const db = client.db("test");
        const movies = await db
            .collection("users")
            .find(email ? {email : email} : {})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
    }
}