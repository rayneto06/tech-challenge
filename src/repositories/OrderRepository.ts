import IOrderRepository from './interfaces/IOrderRepository';
import { Order } from '../interfaces/models/Order';
import { OrderDTO } from '../domain/useCases/Order/OrderDTO';
import { OrderStatus, PaymentStatus } from '../domain/entities/order';

class OrderRepository implements IOrderRepository {
    async getAllOrders(): Promise<OrderDTO[]> {
        const orders = await Order.find();
        return orders.map(order => order.toObject());
    }

    async getAllActiveOrders(): Promise<OrderDTO[]> {
        const orders = await Order.find({ status: { $ne: OrderStatus.FINALIZADO } });
        return orders.map(order => order.toObject());
    }

    async getOrderById(id: string): Promise<OrderDTO | null> {
        const order = await Order.findById(id);
        return order ? order.toObject() : null;
    }

    async getOrderStatusById(id: string): Promise<OrderStatus | null> {
        const order = await Order.findById(id, { status: 1 });
        return order ? order.status : null;
    }

    async getOrderPaymentStatusById(id: string): Promise<PaymentStatus | null> {
        const order = await Order.findById(id, { paymentStatus: 1 });
        return order ? order.paymentStatus : null;
    }

    async createOrder(order: OrderDTO): Promise<OrderDTO> {
        const newOrder = new Order(order);
        await newOrder.save();
        return newOrder.toObject();
    }

    async updateOrder(id: string, orderData: Partial<OrderDTO>): Promise<OrderDTO | null> {
        const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });
        return updatedOrder ? updatedOrder.toObject() : null;
    }

    async updateOrderStatus(id: string, status: { paymentStatus: PaymentStatus, status: OrderStatus }): Promise<OrderDTO | null> {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { ...status, updatedAt: new Date() },
            { new: true }
        );
        return updatedOrder ? updatedOrder.toObject() : null;
    }

    async deleteOrder(id: string): Promise<void> {
        await Order.findByIdAndDelete(id);
    }
}

export default OrderRepository;
