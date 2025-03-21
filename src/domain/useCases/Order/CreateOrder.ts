import IOrderRepository from '../../../repositories/interfaces/IOrderRepository';
import { OrderDTO } from './OrderDTO';
import { Order, OrderStatus, PaymentStatus } from '../../entities/order';

class CreateOrder {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(orderDTO: OrderDTO): Promise<any> {
        const createdAt = new Date();
        const updatedAt = createdAt;

        // Build complete order data without total first.
        const completeOrderData = {
            ...orderDTO,
            _id: undefined,
            createdAt,
            updatedAt
        };

        // Instantiate the Order entity to calculate the total.
        const orderEntity = new Order(completeOrderData);
        const computedTotal = orderEntity.total;

        // Build the payload including the computed total.
        const payload = { ...completeOrderData, total: computedTotal };

        // Pass the payload to the repository.
        const createdOrder = await this.orderRepository.createOrder(payload);
        return createdOrder;
    }
}

export default CreateOrder;
