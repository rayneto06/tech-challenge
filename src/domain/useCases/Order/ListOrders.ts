import IOrderRepository from '../../../repositories/interfaces/IOrderRepository';
import { OrderDTO } from './OrderDTO';
import { OrderStatus } from '../../entities/order';

class ListOrders {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(): Promise<OrderDTO[]> {
        // Retrieve all orders from the repository
        const orders: OrderDTO[] = await this.orderRepository.getAllOrders();
        // Filter out orders with status FINALIZADO
        const activeOrders = orders.filter((order: OrderDTO) => order.status !== OrderStatus.FINALIZADO);

        // Define custom sorting order for statuses: PRONTO > PREPARANDO > RECEBIDO
        const statusPriority: Record<string, number> = {
            [OrderStatus.PRONTO]: 1,
            [OrderStatus.PREPARANDO]: 2,
            [OrderStatus.RECEBIDO]: 3
        };

        activeOrders.sort((a: OrderDTO, b: OrderDTO) => {
            const priorityA = statusPriority[a.status] || 100;
            const priorityB = statusPriority[b.status] || 100;
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            // If statuses are equal, sort by creation date (oldest first)
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        return activeOrders;
    }
}

export default ListOrders;
