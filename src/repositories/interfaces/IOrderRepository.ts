import { OrderDTO } from '../../domain/useCases/Order/OrderDTO';
import { OrderStatus, PaymentStatus } from '../../domain/entities/order';

interface IOrderRepository {
    getAllOrders(): Promise<OrderDTO[]>;
    getAllActiveOrders(): Promise<OrderDTO[]>;
    getOrderById(id: string): Promise<OrderDTO | null>;
    getOrderStatusById(id: string): Promise<OrderStatus | null>;
    getOrderPaymentStatusById(id: string): Promise<PaymentStatus | null>;
    createOrder(order: OrderDTO): Promise<OrderDTO>;
    updateOrder(id: string, order: Partial<OrderDTO>): Promise<OrderDTO | null>;
    updateOrderStatus(id: string, status: { paymentStatus: PaymentStatus, status: OrderStatus }): Promise<OrderDTO | null>;
    deleteOrder(id: string): Promise<void>;
}

export default IOrderRepository;
