"use client";
import React, { useEffect, useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import DocumentCard from "../components/DocumentCard";
import { User } from "../../interfaces/userInterface";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Documents: React.FC = () => {
  const userType = localStorage.getItem('userType') || '';
  const router = useRouter();
  const [documents, setDocuments] = useState([]);
  const searchParams = useSearchParams();
  const { user, error, isLoading } = useUser();

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        `/api/pop?email=${user?.email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goBack = async () => {
    router.back();
  };

  useEffect(() => {
    if (documents.length === 0) {
      fetchDocuments();
      console.log(documents);
    }
  }, []);

  return (
    <div>
      <div className="flex">
        <LandlordSidebar active="/leases" userType={userType}/>
        <div style={{ flex: 1, flexDirection: "column", padding: "20px" }}>
          <h1>Proof of Purchase Documents</h1>
          <div className="flex">
            {documents.map((documentData) => (
              <DocumentCard document={documentData} />
            ))}
          </div>
          <button
            className="btn btn-primary"
            style={{ margin: 20 }}
            onClick={goBack}
          >
            Go Back
          </button>
          <button
            className="btn btn-primary"
            style={{ margin: 20 }}
            onClick={fetchDocuments}
          >
            Refresh
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default Documents;
