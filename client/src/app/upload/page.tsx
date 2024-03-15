"use client"
import React, { useState } from 'react';
import PreviewFile from '../components/PreviewFile';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs/promises'
import {createWriteStream} from 'fs'
import { streamifier } from 'streamifier';
import { saveFileToLocal } from '../actions/uploadAction';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY, 
  api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET 
});

const FileUploadPage: React.FC = () => {
  const [uploads, setUploads] = useState<{ file: File | null, details: string, category: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fileError, setFileError] = useState<string>('');
  const [fileUrl, setFileURL] = useState<string>('');
  const [file, setFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setFile(event.target.files[0])
    }
    /*
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      if (selectedCategory === '') {
        setFileError('Please select a category before uploading.');
        return;
      }
      setFileError('');
      setUploads(prevUploads => [...prevUploads, { file, details: `File name: ${file.name}, File size: ${formatBytes(file.size)}, File type: ${file.type}`, category: selectedCategory }]);
      setSelectedCategory(''); // Reset selected category after upload
    }
    */
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
      // Start reading the PDF file object as binary data
      const formData = new FormData();
      formData.append('pdf',file);
      console.log(file instanceof File);
      console.log(saveFileToLocal(formData).then(res => res.filename));

      // Send formData to server using fetch or axios
      //const response = await fetch('/api/upload', {
      //  method: 'POST',
      //  body: formData
      //});

      // Handle response
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
      /*
      // Upload file to Cloudinary
      cloudinary.uploader.upload_stream({ resource_type: 'raw' }, function (error, result) {
        if (!error && result?.url) {
           setUploadURL(result.url);
        }
        else {
          setUploadURL('');
        }
     }).end(uploads[0]);
     console.log('File uploaded to Cloudinary:', uploadUrl);
     */
  
   
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
