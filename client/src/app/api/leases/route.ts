import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextRequest, res: NextResponse) {
    console.log(req.body);
    try { 
        const { rentalAddress, city, postalcode, province, landlordName, tenantName, rentAmount } = await req.json();
        console.log(rentalAddress);
    
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection('leases');
        const  result = {
            rentalAddress,
            city,
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
  }

export const config = {
    api: {
      bodyParser: true,
    },
}