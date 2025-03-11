import { OrderDTO } from '../domain/useCases/Order/OrderDTO';
import { Order as OrderEntity, OrderStatus, PaymentStatus } from '../entities/order';
import { IOrder } from '../interfaces/IOrder';
import { Order } from '../interfaces/models/Order';
import IOrderRepository from './interfaces/IOrderRepository';

class OrderRepository implements IOrderRepository {
    async createOrder(order: Partial<OrderDTO>): Promise<OrderEntity> {
        const newOrder = new Order(order);
        await newOrder.save();
        return new OrderEntity(newOrder.toObject());
    }

    async getOrderById(id: string): Promise<OrderEntity | null> {
        const order = await Order.findById(id);
        return order ? new OrderEntity(order.toObject()) : null;
    }

    async updateOrder(id: string, order: OrderDTO): Promise<OrderEntity | null> {
        const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
        return updatedOrder ? new OrderEntity(updatedOrder.toObject()) : null;
    }
    async updateOrderStatus(id: string, status: { paymentStatus?: PaymentStatus, status?: OrderStatus }): Promise<OrderEntity | null> {
        const updateFields: { paymentStatus?: PaymentStatus, status?: OrderStatus } = {};
        if (status.paymentStatus !== undefined) {
            updateFields.paymentStatus = status.paymentStatus;
        }
        if (status.status !== undefined) {
            updateFields.status = status.status;
        }
        const updatedOrder = await Order.findByIdAndUpdate(id, updateFields, { new: true });
        return updatedOrder ? new OrderEntity(updatedOrder.toObject()) : null;
    }

    async deleteOrder(id: string): Promise<void> {
        await Order.findByIdAndDelete(id);
    }

    async getOrderStatusById(id: string): Promise<OrderStatus | null> {
        const order = await Order.findById(id);
        return order ? order.status : null;
    }

    async getOrderPaymentStatusById(id: string): Promise<PaymentStatus | null> {
        const order = await Order.findById(id);
        return order ? order.paymentStatus : null;
    }

    async getAll(): Promise<OrderEntity[] | null> {
        const orders: IOrder[] = await Order.find();
        return orders.map(order => new OrderEntity(order));
    }

    async getAllActive(): Promise<OrderEntity[] | null> {
        const orders: IOrder[] = await Order.find({ status: { $ne: OrderStatus.FINALIZADO } })
            .sort({
                status: {
                    $cond: [
                        { $eq: ['$status', OrderStatus.PRONTO] }, 1,
                        {
                            $cond: [
                                { $eq: ['$status', OrderStatus.PREPARANDO] }, 2,
                                {
                                    $cond: [
                                        { $eq: ['$status', OrderStatus.RECEBIDO] }, 3,
                                        4
                                    ]
                                }
                            ]
                        }
                    ]
                },
                createdAt: 1
            });
        return orders.map(order => new OrderEntity(order));
    }
}

export default OrderRepository;