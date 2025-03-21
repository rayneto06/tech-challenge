import IOrderRepository from '../../../repositories/interfaces/IOrderRepository';
import { PaymentStatus } from '../../entities/order';

class CheckPaymentStatus {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(orderId: string): Promise<PaymentStatus | null> {
        const status = await this.orderRepository.getOrderPaymentStatusById(orderId);
        return status;
    }
}

export default CheckPaymentStatus;
