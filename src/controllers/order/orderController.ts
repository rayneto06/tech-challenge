import CreateOrder from '../../domain/useCases/Order/CreateOrder';
import CreateOrderQRCode from '../../domain/useCases/Order/CreateOrderQRCode';
import ViewOrder from '../../domain/useCases/Order/ViewOrder';
import EditOrder from '../../domain/useCases/Order/EditOrder';
import IOrderRepository from '../../repositories/interfaces/IOrderRepository';

import { Combo, OrderStatus, PaymentStatus } from '../../entities/order';
import { IExternalPaymentRepository } from '../../repositories/interfaces/IExternalPaymentRepository';

export class OrderController {
    readonly createOrderUseCase: CreateOrder
    readonly createOrderQRCodeUseCase: CreateOrderQRCode
    readonly viewOrderUseCases:ViewOrder
    readonly editOrderUseCase:EditOrder

    constructor(orderRepository: IOrderRepository, externalPaymentRepository: IExternalPaymentRepository) {
        this.createOrderUseCase = new CreateOrder(orderRepository as IOrderRepository);
        this.viewOrderUseCases = new ViewOrder(orderRepository as IOrderRepository);
        this.editOrderUseCase = new EditOrder(orderRepository as IOrderRepository);
        this.createOrderQRCodeUseCase = new CreateOrderQRCode(orderRepository as IOrderRepository, externalPaymentRepository as IExternalPaymentRepository);
    }
    
    async createOrder({ customerId, combo }: {customerId: string, combo: Combo}) {
        const order = await this.createOrderUseCase.execute({customerId, combo });
        return order;
    }

    async viewAllOrders() {
        const order = await this.viewOrderUseCases.executeAll();
        return order;
    }

    async viewOrder({id}: {id: string}) {
        const order = await this.viewOrderUseCases.execute(id);
        return order;
    }

    async viewActiveOrders() {
        const orders = await this.viewOrderUseCases.executeActive();
        return orders;
    }

    async viewOrderStatus({ id }: { id: string }) {
        const orderStatus = await this.viewOrderUseCases.executeStatusById(id);
        return orderStatus;
    }

    async viewOrderPaymentStatus({ id }: { id: string }) {
        const orderPaymentStatus = await this.viewOrderUseCases.executePaymentStatusById(id);
        return orderPaymentStatus;
    }

    async editOrder({id, orderData}:{id: string, orderData: {
        combo: Combo;
        status: OrderStatus;
        total: number;
        paymentStatus: PaymentStatus;
    }  }){
        const order = await this.editOrderUseCase.execute(id, orderData);
        return order;
    }

    async editOrderStatus({ id, orderStatus, paymentStatus }: { id: string, orderStatus: OrderStatus, paymentStatus: PaymentStatus }) {
        const order = await this.editOrderUseCase.executeStatus(id, orderStatus, paymentStatus);
        return order;
    }

    async createOrderPaymentQRCode({ orderId }: { orderId: string }) {
        const order = await this.createOrderQRCodeUseCase.execute({ orderId });
        return order;
    }

}