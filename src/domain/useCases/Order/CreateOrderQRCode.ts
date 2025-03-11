import { OrderStatus, PaymentStatus } from "../../../entities/order";
import { IExternalPaymentRepository } from "../../../repositories/interfaces/IExternalPaymentRepository";
import IOrderRepository from "../../../repositories/interfaces/IOrderRepository";

interface ICreateOrderQRCode {
    orderId: string;
}

class CreateOrderQRCode {
    constructor(private orderRepository: IOrderRepository, private externalPaymentRepository: IExternalPaymentRepository) { }

    async execute({ orderId }: ICreateOrderQRCode): Promise<string> {
        const order = await this.orderRepository.getOrderById(orderId);

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.status !== OrderStatus.RECEBIDO) {
            throw new Error('Order status must be RECEBIDO to generate QR code');
        }

        if (order.paymentStatus !== PaymentStatus.PENDENTE) {
            throw new Error('Order payment status must be PENDENTE to generate QR code');
        }

        if (order.total) {
            throw new Error('Amount does not match order total');
        }

        const qrCode = await this.generateQRCode(orderId, order.total);
        return qrCode;
    }

    private async generateQRCode(orderId: string, amount: number): Promise<string> {
        const qrCodeDetails = {
            cash_out: {
                amount
            },
            description: 'COMBO LANCHE',
            title: 'Order - FIAP TECH CHALLENGE',
            total_amount: amount,
            external_reference: orderId
        };

        const response = await this.externalPaymentRepository.createOrder(orderId, qrCodeDetails)

        await this.externalPaymentRepository.assignQRCode(qrCodeDetails);

        return response.qr_data;
    }

}

export default CreateOrderQRCode;