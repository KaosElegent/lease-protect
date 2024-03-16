"use client";
import React, { useState } from "react";
import LandlordSidebar from "../components/LandlordSidebar";
import { useRouter } from "next/navigation";
import { saveFileToLocal, updateMongoPop, uploadFileToCloudinary, getHash, updateUserPop } from '../actions/uploadAction';
import {load} from "../../funcs";
import { useUser } from "@auth0/nextjs-auth0/client";

const CreateLease = () => {
  const userType = localStorage.getItem('userType') || '';
  const router = useRouter();
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddressAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [file, setFile] = useState<File>();
  const { user, error, isLoading } = useUser();
  const [leaseID, setLeaseID] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("leaseid") || "" : ""
  );
  //const scdata = load();

  React.useEffect(() => {
    setLeaseID(localStorage.getItem("leaseid") || "");
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      setAddressAccount(e.addressAccount);
      setContract(e.todoContract);
    });
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files){
      setFile(event.target.files[0])
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLeaseID(localStorage.getItem("leaseid") || "");
    const formData = new FormData(event.currentTarget);
    
    let hash = "";
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const formData2 = new FormData();
      formData2.append('file',file);
      console.log(file instanceof File);
      const localFile = await saveFileToLocal(formData2);
      hash = "0x" + await getHash(localFile.filepath);
      console.log(hash)
      console.log("calling upload to cloudinary");
      const tmpTime = Date.now().toString();
      const cloudFile = await uploadFileToCloudinary(localFile.filepath, "pop", tmpTime);
      console.log("done uploading to cloudinary")
      await updateMongoPop(hash, cloudFile.url,  "pop", tmpTime);
      await updateUserPop(leaseID, user?.email,"pop",tmpTime);
      console.log(cloudFile)



      router.back();
      //router.push(`/documents?leaseid=${leaseid}`);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
    

    console.log(formData.get("rentAmount"));
    console.log(contract);
    console.log(await contract.payRent(hash,
            formData.get("rentAmount"),
            {from: addressAccount}));
            setRefresh(true);
    //router.back();
  };

  return (
    <div className="flex">
      <LandlordSidebar active="/create-lease" userType={userType}/>
      <div style={{ flexDirection: "column", padding: "20px" }}>
        <h1>Pay Rent</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="rentAmount" className="form-label">
              Rent Period
            </label>
            <input
              type="number"
              className="form-control"
              id="rentAmount"
              name="rentAmount"
              aria-describedby="rentHelp"
            />
            <div id="rentHelp" className="form-text">
              Number of Months
            </div>
            <div className="custom-file ml-3">
              <input type="file" className="custom-file-input" onChange={handleFileChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLease;
