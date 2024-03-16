//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User, Document } from "../../../../mongodb/schemas";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

// query leases collection based on user email
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const email = urlParams.get('email')

        const user = await User.find({email:email}).exec();
        const proof_ids = user[0].popIDs;
        console.log(user[0]);

        let proofs = [];
        for(let id of proof_ids){
            const aLease = await Document.find({ _id: id}).exec();
            proofs.push(aLease[0]);
        }

        return NextResponse.json(proofs, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
