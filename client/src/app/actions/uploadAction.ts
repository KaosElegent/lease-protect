"use server";
import path from "path";
import os from "os";
import * as fs from "fs";
// import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";
//import Recording from "../models/fileModel";
//import connectDB from "../db/config";

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY, 
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET 
  });

export async function saveFileToLocal(formData: FormData) {
  const file = formData.get("pdf");

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

export async function uploadFileToCloudinary(filepath,leaseid, type) {
  console.log("dd");
  const uploadDetails = await cloudinary.uploader.upload(filepath, {
    folder: "Documents",
    public_id: `${leaseid}-${type.replace(' ','_')}`,
  });

  console.log(uploadDetails);

  return uploadDetails;
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
