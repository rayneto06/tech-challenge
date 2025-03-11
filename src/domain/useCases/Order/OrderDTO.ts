import { Combo, OrderStatus, PaymentStatus } from "../../../entities/order";

export interface OrderDTO {
    customerId?: string;
    combo: Combo;
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}