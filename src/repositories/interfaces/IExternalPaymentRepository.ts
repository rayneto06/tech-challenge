export interface ExternalPaymentOrderDTO {
    total_amount: number;
    external_reference: string;
    cash_out: {
        amount: number;
    }
    title: string;
    description: string;
}

export interface IExternalPaymentOrder {
    in_store_order_id: string;
    qr_data: string;
}

export interface IExternalPaymentRepository {
    createOrder(orderId: string, externalPaymentOrder: ExternalPaymentOrderDTO): Promise<IExternalPaymentOrder>;
    assignQRCode(qrCodeDetails: ExternalPaymentOrderDTO): Promise<void>;
    getPaymentDetails(paymentId: string): Promise<any>;
}