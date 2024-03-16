//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Lease, Document } from "../../../../mongodb/schemas";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

// query leases collection based on user email
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const lease_id = urlParams.get('leaseid')
        console.log("LEASE ID", lease_id);

        const lease = await Lease.find({_id:lease_id}).exec();
        const doc_ids = lease[0].docIDs;

        let docs = [];
        for(let id of doc_ids){
            const aDoc = await Document.find({ _id: id}).exec();
            docs.push(aDoc[0]);
        }

        return NextResponse.json(docs, { status: 200 });
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