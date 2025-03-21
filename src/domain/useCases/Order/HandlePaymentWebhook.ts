import IOrderRepository from '../../../repositories/interfaces/IOrderRepository';
import { PaymentStatus, OrderStatus } from '../../../domain/entities/order';

interface WebhookPayload {
    orderId: string;
    paymentStatus: PaymentStatus; // Expected values: PaymentStatus.PAGO, PaymentStatus.PENDENTE, or PaymentStatus.CANCELADO
}

class HandlePaymentWebhook {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(payload: WebhookPayload): Promise<void> {
        const { orderId, paymentStatus } = payload;
        // If payment is approved (i.e. PAGO), update order status to PREPARANDO.
        const newOrderStatus = paymentStatus === PaymentStatus.PAGO ? OrderStatus.PREPARANDO : undefined;
        await this.orderRepository.updateOrder(orderId, {
            paymentStatus,
            ...(newOrderStatus ? { status: newOrderStatus } : {}),
            updatedAt: new Date()
        });
    }
}

export default HandlePaymentWebhook;
