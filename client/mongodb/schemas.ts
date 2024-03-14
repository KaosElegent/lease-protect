/* import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config();
 
let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || "");

let userSchema = new Schema({
  role: String,
  email: String,
  fName: String,
  lName: String,
  username: String,
  ethAddress: String,
  leaseIDs: [{type: Schema.Types.ObjectId, ref: 'Lease'}],
});
let User = mongoose.model('users', userSchema);

let leaseSchema = new Schema({
  name: String,
  agreementID: Schema.Types.ObjectId,
  docIDs: [{type: Schema.Types.ObjectId, ref: 'Document'}],
  userIDs: [{type: Schema.Types.ObjectId, ref: 'User'}],
});
let Lease = mongoose.model('leases', leaseSchema);

let docSchema = new Schema({
  name: String,
  url: String,
  hash: String,
});
let Document = mongoose.model('documents', docSchema);

module.exports = {User, Lease, Document}; */