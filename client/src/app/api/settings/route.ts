//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from '../../../../mongodb/schemas';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");


// Update Settings
export async function PUT(req: NextRequest, res: NextResponse) {
    try { 
        const { email, fName, lName, username, ethAddress} = await req.json();

        User.updateOne( {email : email}, { $set : {
            fName : fName,
            lName : lName,
            username : username,
            ethAddress : ethAddress
        }}).exec()
            .then(() => {
                console.log("User Settings Updated!");
            })
            .catch((err) => {
                console.log("Error Updating Settings: ", err);
                return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
            })
        return NextResponse.json({ success:"ok" }, { status: 200 })
    } catch (e) {
        console.log("can't post: ", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export const config = {
    api: {
      bodyParser: true,
    },
}