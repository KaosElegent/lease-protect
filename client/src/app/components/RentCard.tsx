"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { User } from "../../interfaces/userInterface";
import img1 from "../../../assets/images/house1.jpg";
import img2 from "../../../assets/images/house2.jpg";
import img3 from "../../../assets/images/house3.jpg";
import img4 from "../../../assets/images/house4.jpg";
import img5 from "../../../assets/images/house5.jpg";
import img6 from "../../../assets/images/house6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

interface Props {
  rent: User;
}

const RentCard: React.FC<Props> = ({ rent }) => {
  const router = useRouter();
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="card" style={{ width: "18rem", margin: "20px" }}>
      <img
        className="card-img-top"
        src={randomImage.src}
        alt="Photo of property"
      />
      <div className="card-body">
        <h5 className="card-title">{rent.email}</h5>
        <p className="card-text">
          {rent.fName}, {rent.lName}
        </p>
        <p className="card-text">Username: {rent.username}</p>
      </div>
    </div>
  );
};

export default RentCard;
