import { Schema } from 'mongoose';

export interface Lease {
    _id: string;
    rentalAddress: String,
    city: String,
    postalcode: String,
    province: String,
    landlordName: String,
    landlordEmail: String,
    tenantNames: String,
    tenantEmails: String,
    rentAmount: Number,
    docIDs: [{type: Schema.Types.ObjectId, ref: 'Document'}];
}
