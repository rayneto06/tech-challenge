import { Request, Response } from 'express';
import HandleExternalPaymentWebhook from '../../../domain/useCases/Payment/handleExternalPaymentWebhook';

export default class ExternalPaymentWebhookController {
    constructor(private handleExternalPaymentWebhook: HandleExternalPaymentWebhook) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            await this.handleExternalPaymentWebhook.execute(req.body);
            res.status(200).send('Webhook processed successfully');
        } catch (error) {
            console.error('Error processing external payment webhook:', error);
            res.status(500).send('Error processing webhook');
        }
    }
}
