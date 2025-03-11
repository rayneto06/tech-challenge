import { OrderDTO } from '../../domain/useCases/Order/OrderDTO';
import { Order, OrderStatus, PaymentStatus } from '../../entities/order';

interface IOrderRepository {
    getAll(): Promise<Order[] | null>;
    getAllActive(): Promise<Order[] | null>;
    getOrderById(id: string): Promise<Order | null>;
    getOrderStatusById(id: string): Promise<OrderStatus | null>;
    getOrderPaymentStatusById(id: string): Promise<PaymentStatus | null>;
    createOrder(order: OrderDTO): Promise<Order>;
    updateOrder(id: string, order: Partial<OrderDTO>): Promise<Order | null>;
    updateOrderStatus(id: string, status: { paymentStatus: PaymentStatus, status: OrderStatus }): Promise<Order | null>;
    deleteOrder(id: string): Promise<void>;
}

export default IOrderRepository;