import mongoose, { Model } from 'mongoose';
import { IOrder } from '../IOrder';
import { OrderStatus } from '../../entities/order';

interface OrderDocument extends Omit<IOrder, '_id'>, Document { }

const OrderSchema = new mongoose.Schema({
    combo: { type: Array, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false },
    status: { type: String, required: true, default: OrderStatus.RECEBIDO },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
});

const Order: Model<OrderDocument> = mongoose.model<OrderDocument>('Order', OrderSchema);

export { Order, OrderSchema }