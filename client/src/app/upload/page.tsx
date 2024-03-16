"use client"
import React, { useState } from 'react';
import PreviewFile from '../components/PreviewFile';
import {v2 as cloudinary} from 'cloudinary';
import { saveFileToLocal, updateMongo, uploadFileToCloudinary } from '../actions/uploadAction';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET 
});

const FileUploadPage: React.FC = () => {
  const [uploads, setUploads] = useState<{ file: File | null, details: string, category: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fileError, setFileError] = useState<string>('');
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if(event.target.files){
      setFile(event.target.files[0])
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };  

  const handleDelete = (index: number) => {
    setUploads(prevUploads => prevUploads.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_CLOUD_API_KEY);
   console.log('/.env');
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file',file);
      console.log(file instanceof File);
      const localFile = await saveFileToLocal(formData);
      const cloudFile = await uploadFileToCloudinary(localFile.filepath, "65f4b1ae81aada539d89a6f1", selectedCategory);
      updateMongo("hash", cloudFile.url,  "65f4b1ae81aada539d89a6f1", selectedCategory);
      console.log(cloudFile)
  
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  
   
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' }}>
      <form 
        id="upload-file"
        onSubmit={handleSubmit}>
      <div className="container mt-5">
        <h1 className="mb-4">File Upload</h1>
        <div className="mb-4">
          <div className="input-group">
            <select className="custom-select" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="" disabled hidden>Select category</option>
              <option value="Lease Agreement">Lease Agreement</option>
              <option value="Payment Confirmation">Payment Confirmation</option>
              <option value="Tenant Credentials">Tenant Credentials</option>
              <option value="Landlord Credentials">Landlord Credentials</option>
              <option value="Other">Other</option>
            </select>
            <div className="custom-file ml-3">
              <input type="file" className="custom-file-input" onChange={handleFileChange} disabled={selectedCategory === ''} />
            </div>
          </div>
          {fileError && <div className="text-danger">{fileError}</div>}
        </div>
        <div className="row">
          {uploads.map((upload, index) => (
            <div key={index} className="col-md-4 mb-4">
              <PreviewFile
                file={upload.file!}
                details={upload.details}
                category={upload.category}
                onDelete={() => handleDelete(index)}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn btn-primary" type='submit'>Send Files</button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default FileUploadPage;
