import mongoose, { Document, Model } from 'mongoose';
import { ICustomer } from '../ICustomer';

interface CustomerDocument extends Omit<ICustomer, '_id'>, Document { }

const CustomerSchema = new mongoose.Schema({
    cpf: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
});

const Customer: Model<CustomerDocument> = mongoose.model<CustomerDocument>('Customer', CustomerSchema);

export { Customer, CustomerSchema };