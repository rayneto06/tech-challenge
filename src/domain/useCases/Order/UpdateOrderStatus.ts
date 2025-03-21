import IOrderRepository from '../../../repositories/interfaces/IOrderRepository';
import { OrderDTO } from './OrderDTO';
import { OrderStatus } from '../../entities/order';

class UpdateOrderStatus {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(orderId: string, newStatus: OrderStatus): Promise<OrderDTO | null> {
        return this.orderRepository.updateOrder(orderId, { status: newStatus, updatedAt: new Date() });
    }
}

export default UpdateOrderStatus;
