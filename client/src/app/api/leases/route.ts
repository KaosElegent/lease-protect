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
        console.log(user);

        const leases = await Lease.find({ _id: { $in: user.leaseIDs } }).exec().toArray();
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
        const { rentalAddress, city, postalcode, province, landlordName, tenants , rentAmount, docIDs, landlordEmail } = await req.json();

        let lease = new Lease({
            rentalAddress: rentalAddress,
            city: city,
            postalcode: postalcode,
            province: province,
            landlordName: landlordName,
            landlordEmail : landlordEmail,
            tenants : tenants,
            rentAmount: Number(rentAmount),
            docIDs: docIDs,
        });

        lease.save()
        .then(() => {
            console.log('Lease was saved to the leases collection');
        })
        .catch((err: any) => {
            console.log(err);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        });
        
        const leases = await Lease.find({landlordEmail : landlordEmail}, '_id').exec()
        const lease_id = leases[-1]._id;
        let emails = [landlordEmail];
        tenants.forEach((tenant) => {
            emails.append(tenant.email);
        });

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