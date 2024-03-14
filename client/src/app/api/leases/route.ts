//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

let leaseSchema = new mongoose.Schema({
    rentalAddress: String,
    city: String,
    postalcode: String,
    province: String,
    landlordName: String,
    tenantName: String,
    rentAmount: Number
  });
  
let Lease = mongoose.models.leases || mongoose.model('leases', leaseSchema);

export async function POST(req: NextRequest, res: NextResponse) {
    try { 
        const { rentalAddress, city, postalcode, province, landlordName, tenantName , rentAmount } = await req.json();

        let lease = new Lease({
            rentalAddress: rentalAddress,
            city: city,
            postalcode: postalcode,
            province: province,
            landlordName: landlordName,
            tenantName: tenantName,
            rentAmount: Number(rentAmount)
        });

        lease.save()
        .then(() => {
            console.log('Lease was saved to the leases collection');
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

/* export async function POST(req: NextRequest, res: NextResponse) {
    console.log(req.body);
    try { 
        const { rentalAddress, city, postalcode, province, landlordName, tenantName, rentAmount } = await req.json();
        console.log(rentalAddress);
    
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('leases');
        const  result = {
            rentalAddress: rentalAddress,
            city: city,
            postalcode,
            province,
            landlordName,
            tenantName,
            rentAmount
        }

        await collection.insertOne(result);
    
        //const result = await collection.insertOne({ rentalAddress, city, postalcode, province, landlordName, tenantName, rentAmount});
    
        return NextResponse.json({ success: 'ok' }, { status: 200 })
    } catch (e) {
        console.log("can't post: ", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } */

export const config = {
    api: {
      bodyParser: true,
    },
}