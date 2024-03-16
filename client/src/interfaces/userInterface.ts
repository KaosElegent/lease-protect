import mongoose from 'mongoose'

export interface User {
    _id: string;
    role: String,
    email: String,
    fName: String,
    lName: String,
    username: String,
    ethAddress: String,
    leaseIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lease'}],
    popIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pop'}],
  payerIDs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Payer'}],
}