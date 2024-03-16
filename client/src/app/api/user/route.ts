import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextResponse, NextRequest } from 'next/server';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../../../../mongodb/schemas";
//const User = require('../../../interfaces/userInterface');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

export async function POST(req: NextRequest, res: NextResponse) {
    try { 
        const { role, email, fName, lName, username, ethAddress, leaseIDs, popIDs, payerIDs } = await req.json();
        let cnt = await User.find({ email: email }).exec();
        if(cnt.length === 0){
            let user = new User({
                role: role,
                email: email,
                fName: fName,
                lName: lName,
                username: username,
                ethAddress: ethAddress,
                leaseIDs: leaseIDs,
                popIDs: popIDs,
                payerIDs: payerIDs,
            });

            await user.save();
            
            console.log('User was saved to the users collection User');
            
        }
        else{
            console.log("User already exists");
        }
        return NextResponse.json({ success:"ok" }, { status: 200 })
    } catch (e) {
        console.log("can't post: ", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}