import { Combo, OrderStatus, PaymentStatus } from "../../../../entities/order";

export interface OrderDTO {
    customerId?: string;
    total: number;
    combo: Combo;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}