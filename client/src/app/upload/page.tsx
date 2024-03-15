"use client"
import React, { useState } from 'react';
import PreviewFile from '../components/PreviewFile';

const FileUploadPage: React.FC = () => {
  const [uploads, setUploads] = useState<{ file: File | null, details: string, category: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [fileError, setFileError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      if (!selectedCategory) { 
        setFileError('Please select a category before uploading.');
        return;
      }
      setFileError('');
      setUploads(prevUploads => [...prevUploads, { file, details: `File name: ${file.name}, File size: ${formatBytes(file.size)}, File type: ${file.type}`, category: selectedCategory }]);
      setSelectedCategory(''); // Reset selected category after upload
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };  

  const handleDelete = (index: number) => {
    setUploads(prevUploads => prevUploads.filter((_, i) => i !== index));
  };

  const handleSendFiles = async () => {
    // Mock endpoint for sending files
    const endpoint = 'https://';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(uploads),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Reset uploads after successful send
        setUploads([]);
        console.log('Files sent successfully.');
      } else {
        console.error('Failed to send files.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' }}>
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
          <button className="btn btn-primary" onClick={handleSendFiles}>Send Files</button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;
