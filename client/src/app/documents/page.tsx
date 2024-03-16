"use client";
import React, { useEffect, useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import DocumentCard from "../components/DocumentCard";

const Documents: React.FC = () => {
  const [id, setId] = useState("");
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/documents?leaseid=${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id") ?? "";
    setId(id);

    if (documents.length === 0) {
      fetchDocuments();
      console.log(documents);
    }
  }, [id]);

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
          <a href="/upload" className="btn btn-primary">
            Add New Document
          </a>
        </div>
      </div>
    </div>
  );
};

export default Documents;
