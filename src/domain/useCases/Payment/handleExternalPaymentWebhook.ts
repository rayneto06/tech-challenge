import { OrderStatus, PaymentStatus } from "../../../entities/order";
import { IExternalPaymentRepository } from "../../../repositories/interfaces/IExternalPaymentRepository";
import IOrderRepository from "../../../repositories/interfaces/IOrderRepository";

export default class HandleExternalPaymentWebhook {
    constructor(
        private orderRepository: IOrderRepository,
        private externalPaymentRepository: IExternalPaymentRepository
    ) { }

    async execute(externalPaymentBody: any): Promise<void> {
        const paymentDetails = await this.fetchPaymentDetails(externalPaymentBody.data.id);
        await this.updateOrderStatus(paymentDetails);
    }

    private async fetchPaymentDetails(paymentId: string): Promise<any> {
        const paymentDetails = await this.externalPaymentRepository.getPaymentDetails(paymentId);
        return paymentDetails;
    }

    private async updateOrderStatus(paymentDetails: any): Promise<void> {
        const orderId = paymentDetails.external_reference;
        const status = paymentDetails.status;
        const order = await this.orderRepository.getOrderById(orderId);

        if(!order) throw new Error("Pedido não encontrado");
        const mappedOrderStatus: 
        { paymentOrderStatus: PaymentStatus, orderStatus: OrderStatus } | "UNKNOWN" =
         order.mapPaymentStatusToOrderStatus(status)
        if (mappedOrderStatus === "UNKNOWN") {
            throw new Error("Status desconhecido");
        }

        const { paymentOrderStatus, orderStatus } = mappedOrderStatus;

        await this.orderRepository.updateOrderStatus(orderId, { paymentStatus: paymentOrderStatus, status: orderStatus });
    }
}