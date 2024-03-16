//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User, Lease } from "../../../../mongodb/schemas";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

// query leases collection based on user email
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const email = urlParams.get('email')

        const user = await User.find({email:email}).exec();
        const payer_ids = user[0].payerIDs;

        let payers = [];
        for(let id of payer_ids){
            const aUser = await User.find({ _id: id}).exec();
            payers.push(aUser[0]);
        }

        return NextResponse.json(payers, { status: 200 })
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    try {
        const { email, landlordEmail } = await req.json();

        const user = await User.find({email:email}).exec();
        const payer_id = user[0]._id;

        await User.updateMany({ email : landlordEmail}, { $pull: {payerIDs: payer_id}}).exec();

        return NextResponse.json({ success:"ok" }, { status: 200 })
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export const config = {
    api: {
      bodyParser: true,
    },
}