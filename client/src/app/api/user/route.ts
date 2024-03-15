import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../../../interfaces/userInterface";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");


export async function GET(req :Request) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const email = urlParams.get('email')
        const client = await clientPromise;
        const db = client.db("test");
        // Check if a user with the provided email already exists
        const existingUser = await db.collection("users").findOne({ email: email });

        // add to db if it doesn't exist
        if (existingUser) {
            console.log("User already exists");
            return NextResponse.json(existingUser);
        } else {
            const newUser = {
                email: email,
            };
            await db.collection("users").insertOne(newUser);
            console.log("User added to db");
            return NextResponse.json(newUser);
        }
    } catch (e) {
        console.error(e);
    }
}

let userSchema: mongoose.Schema<User> = new mongoose.Schema({
    role: String,
    email: String,
    fName: String,
    lName: String,
    username: String,
    ethAddress: String,
    leaseIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lease'}],
});
  
let UserModel = mongoose.models.users || mongoose.model('users', userSchema);

export async function POST(req: NextRequest, res: NextResponse) {
    try { 
        const { role, email, fName, lName, username, ethAddress, leaseIDs } = await req.json();

        let user = new UserModel({
            role: role,
            email: email,
            fName: fName,
            lName: lName,
            username: username,
            ethAddress: ethAddress,
            leaseIDs: leaseIDs
        });

        user.save()
        .then(() => {
            console.log('User was saved to the users collection');
        })
        .catch((err: any) => {
            console.log(err);
        });
        return NextResponse.json({ success:"ok" }, { status: 200 })
    } catch (e) {
        console.log("can't post: ", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}