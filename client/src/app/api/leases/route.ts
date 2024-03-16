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
        console.log(email);

        const user = await User.find({email:email}).exec();
        const lease_ids = user[0].leaseIDs;
        console.log(user[0]);

        let leases = [];
        for(let id of lease_ids){
            const aLease = await Lease.find({ _id: id}).exec();
            leases.push(aLease[0]);
        }
        //const leases = await Lease.find({ _id: { $in: user.leaseIDs } }).exec();
        console.log("Leases: ",leases);

        return NextResponse.json(leases, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// create new lease
export async function POST(req: NextRequest, res: NextResponse) {
    try { 
        const { rentalAddress, city, postalcode, province, landlordName, tenantEmails, tenantNames , rentAmount, docIDs, landlordEmail } = await req.json();

        let lease = new Lease({
            rentalAddress: rentalAddress,
            city: city,
            postalcode: postalcode,
            province: province,
            landlordName: landlordName,
            landlordEmail : landlordEmail,
            tenantEmails : tenantEmails,
            tenantNames : tenantNames,
            rentAmount: Number(rentAmount),
            docIDs: docIDs,
        });

        await lease.save()

        console.log('Lease was saved to the leases collection');
        
        
        const leases = await Lease.find({landlordEmail : landlordEmail}, '_id').exec()
        console.log(leases[leases.length-1]);
        const lease_id = leases[[leases.length-1]]._id;

        let emails = [];
        emails.push(landlordEmail);
        for(let em of tenantEmails){
            emails.push(em);
        }

        //update users
        emails.forEach(async (email)=>{
            await User.updateOne({email:email}, {$push : {leaseIDs : lease_id}});
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