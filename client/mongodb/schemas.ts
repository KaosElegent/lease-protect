import mongoose from 'mongoose'
 
let Schema = mongoose.Schema;

let userSchema = new Schema({
  role: String,
  email: String,
  fName: String,
  lName: String,
  username: String,
  ethAddress: String,
  leaseIDs: [{type: Schema.Types.ObjectId, ref: 'Lease'}],
});

export const User = mongoose.models.users || mongoose.model('users', userSchema);

let leaseSchema = new Schema({
  rentalAddress: String,
  city: String,
  postalcode: String,
  province: String,
  landlordName: String,
  landlordEmail: String,
  tenantEmails: [String],
  tenantNames: [String],
  rentAmount: Number,
  docIDs: [{type: Schema.Types.ObjectId, ref: 'Document'}],
});

export const Lease = mongoose.models.leases || mongoose.model('leases', leaseSchema);

let docSchema = new Schema({
  name: String,
  url: String,
  hash: String,
});

export const Document =mongoose.models.documents || mongoose.model('documents', docSchema);

