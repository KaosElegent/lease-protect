//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import clientPromise from "../../../../mongodb/mongodb";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

let leaseSchema = new mongoose.Schema({
    rentalAddress: String,
    city: String,
    postalcode: String,
    province: String,
    landlordName: String,
    tenantName: String,
    rentAmount: Number,
    docIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Document'}]
  });
  
let Lease = mongoose.models.leases || mongoose.model('leases', leaseSchema);

// query leases collection based on user email
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const urlParams = new URLSearchParams(req.url.split('?')[1])
        const email = urlParams.get('email')
        console.log(email);
        const client = await clientPromise;
        const db = client.db("test");
        
        // get user
        const user = await db.collection("users").findOne({ email });
        console.log(user);

        // get leases from references
        const leases = await db.collection("leases").find({ _id: { $in: user?.leaseIDs } }).toArray();
        console.log(leases);

        return NextResponse.json(leases, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// create new lease
export async function POST(req: NextRequest, res: NextResponse) {
    try { 
        const { rentalAddress, city, postalcode, province, landlordName, tenantName , rentAmount, docIDs } = await req.json();

        let lease = new Lease({
            rentalAddress: rentalAddress,
            city: city,
            postalcode: postalcode,
            province: province,
            landlordName: landlordName,
            tenantName: tenantName,
            rentAmount: Number(rentAmount),
            docIDs: docIDs,
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