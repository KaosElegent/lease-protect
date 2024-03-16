import React from "react";
import { Document } from "../../interfaces/documentInterface";
import img1 from "../../../assets/images/doc.png";
import { Download } from "react-bootstrap-icons";

interface Props {
  document: Document;
}

const DocumentCard: React.FC<Props> = ({ document }) => {
  return (
    <a href={document.url.toString()}>
    <div className="card" style={{ width: "18rem", margin: "20px" }}>
      <img className="card-img-top" src={img1.src} alt="Photo of document" />
      <div className="card-body">
        <h5 className="card-title">{document.name}</h5>
        <p className="card-text">
          <Download size={20} />
          {document.url}
        </p>
      </div>
    </div>
    </a>
  );
};

export default DocumentCard;
