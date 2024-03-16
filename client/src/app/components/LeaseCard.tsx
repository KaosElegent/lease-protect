import React from "react";
import { Lease } from "../../interfaces/leaseInterface";
import img1 from "../../../assets/images/house1.jpg";
import img2 from "../../../assets/images/house2.jpg";
import img3 from "../../../assets/images/house3.jpg";
import img4 from "../../../assets/images/house4.jpg";
import img5 from "../../../assets/images/house5.jpg";
import img6 from "../../../assets/images/house6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

interface Props {
  lease: Lease;
}

const LeaseCard: React.FC<Props> = ({ lease }) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="card" style={{ width: "18rem", margin: "20px" }}>
      <img
        className="card-img-top"
        src={randomImage.src}
        alt="Photo of property"
      />
      <div className="card-body">
        <h5 className="card-title">{lease.rentalAddress}</h5>
        <p className="card-text">
          {lease.city}, {lease.province}
        </p>
        <p className="card-text">Tenant: {lease.tenantName}</p>
        <p className="card-text">Landlord: {lease.landlordName}</p>
        <p className="card-text">Rent: {lease.rentAmount.toString()}</p>
        <a href={"/documents?leaseid=" + lease._id} className="btn btn-primary">
          See Details
        </a>
      </div>
    </div>
  );
};

export default LeaseCard;
