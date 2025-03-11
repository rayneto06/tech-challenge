import { Combo, OrderStatus, PaymentStatus } from "../entities/order";
import { ICustomer } from "./ICustomer";

export interface IOrder {
    _id?: string;
    combo: Combo;
    customer?: ICustomer;
    total: number;
    paymentStatus: PaymentStatus
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}