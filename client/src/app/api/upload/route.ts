import clientPromise from "../../../../mongodb/mongodb";
//import { NextResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server'; 
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = formidable();
    try{
    form.parse(req, (err:any, fields:any, files:any) => {
        if (err) {
          console.error('Error parsing form data:', err);
          return res.status(500).json({ error: 'Error uploading file'})
        }
    
        const uploadedFile = files.file; // Access the uploaded file
        console.log(typeof uploadedFile);
        // Do something with the uploaded file, such as saving it to the server
        
        return res.status(200).json({ error: 'File Successfully Uploaded' })
    });
    }
    catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      /*
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
    */
}

export const config = {
    api: {
      bodyParser: false, // Disables body parsing, as we're using formidable to parse the form data
    },
  };