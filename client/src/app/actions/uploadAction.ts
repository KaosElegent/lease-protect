"use server";
import path from "path";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import mongoose from 'mongoose';
import { Document, Lease } from "../../../mongodb/schemas";
import * as Crypto from 'crypto';

import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY, 
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET 
  });

async function getHash(filePath){
  let shashum = Crypto.createHash('sha256');
  try{
    let st = new fs.ReadStream(filePath);
    st.on('data', (d) => {
      shashum.update(d);
    });
    st.on('end', () => {
      let d = shashum.digest('hex');
      console.log(d);
      return d;
    });
  }
  catch(err){
    console.log(err);
  }
}

export async function saveFileToLocal(formData: FormData) {
  const file = formData.get("file");

  if (file instanceof Blob) {
    
    const bufferPromise = file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const filePath = path.join(__dirname, file.name);

      fs.writeFile(filePath, buffer, (err) => err && console.error(err));

      return { filepath: filePath, filename: file.name };
    });
    console.log("finishing local save promise");
    return bufferPromise;

  } else {
    return console.error("No file received");
  }
}

export async function uploadFileToCloudinary(filepath:string,leaseid:String, type:String) {
  console.log("dd");
  const uploadDetails = await cloudinary.uploader.upload(filepath ? filepath : " ", {
    folder: "Documents",
    public_id: `${leaseid}-${type.replace(' ','_')}`,
  });

  console.log(uploadDetails);

  return uploadDetails;
}

async function  updateLease(leaseid:string, type:String) {
    Document.find({name : `${leaseid}-${type.replace(' ','_')}`}, '_id')
                    .then((doc_id) => {
                        console.log(doc_id);
                            // update lease
                        Lease.updateOne({_id: new mongoose.Types.ObjectId(leaseid)},
                            { $push : {"docIDs" : doc_id}})
                            .then(() => {
                                console.log("Lease Updated");
                            })
                            .catch((err:any) => {
                                console.log(err);
                            })
                    })
                    .catch((err:any) => {
                        console.log("Somethign went wrong with getting new doc's id: ", err);
                    });
}

export async function updateMongo(hash:String, url:String, leaseid:string, type:String){
    Document.find({name: `${leaseid}-${type.replace(' ','_')}`})
        .exec()
        .then((doc:any) => {
            if(!doc.length){
                // create new
                let doc = new Document({
                    name: `${leaseid}-${type.replace(' ','_')}`,
                    url: url,
                    hash : hash
                });
                doc.save()
                    .then(() => {
                        console.log("New Document Saved");
                        updateLease(leaseid, type)
                    })
                    .catch((err:any) => {
                        console.log(err);
                    })
            }

            else{
                Document.updateOne({name: `${leaseid}-${type.replace(' ','_')}`}, 
                        { $set : { url : url, hash : hash } })
                        .exec()
                        .then(() => {
                            console.log("Document Updated");
                        })
                        .catch((err:any) => {
                            console.log(err);
                        })
                console.log("Doc already exists")
                console.log(doc)
            }
        })
}

export async function uploadFile(formData, email, title, topic) {
  try {
    await connectDB();
    const newFile = await saveFileToLocal(formData);

    const file = await uploadFileToCloudinary(email, title);
    console.log(file.url);
    console.log(file);
    fs.unlink(newFile.filepath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File deleted successfully");
      }
    });

    console.log("hello");

    const newRecording = new Recording({
      public_id: file.public_id,
      secure_url: file.secure_url,
      email,
      title,
      topic,
    });

    console.log("the url1: " + file.url);
    await Recording.create(newRecording);
    console.log("the url2: " + file.url);

    let questions = fetch("http://localhost:5328/papi/stt/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ln: file.url }),
    })
      .then((res) => res.json())
      .then((body) => {
        return body;
      });
    console.log(questions);
  } catch (error) {
    return { errMsg: error.message };
  }
}
