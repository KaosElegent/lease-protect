"use client";
import React, { useEffect, useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import DocumentCard from "../components/DocumentCard";
import { Lease } from "../../interfaces/leaseInterface";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Documents: React.FC =  () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [leaseID, setLeaseID] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('leaseid') || '' : ''));
  const [documents, setDocuments] = useState([]);
  const searchParams = useSearchParams();
  const fetchDocuments = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.get("leaseid") || "");
      const response = await fetch(`/api/documents?leaseid=${urlParams.get("leaseid") || ""}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addDocument = async () => {
    setLeaseID(searchParams.get("leaseid") || "");
    router.push(`/upload?leaseid=${leaseID}`);
  }
  
  useEffect(() => {
    if (documents.length === 0) {
      fetchDocuments();
      console.log(documents);
    }
  }, []);
  

  return (
    <div>
      <div className="flex">
        <LandlordSidebar active="/leases" />
        <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
          <h1>Lease Documents</h1>
          <div className="flex">
            {documents.map((documentData) => (
              <DocumentCard document={documentData} />
            ))}
          </div>
          <button
            className="btn btn-primary"
            style={{ margin: 20 }}
            onClick={fetchDocuments}
          >
            Refresh
          </button>
          <a onClick={addDocument} className="btn btn-primary">
            Add New Document
          </a>
        </div>
      </div>
    </div>
  );
};

export default Documents;
