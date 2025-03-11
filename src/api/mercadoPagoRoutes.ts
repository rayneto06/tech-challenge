import express from 'express';

import OrderRepository from '../repositories/OrderRepository';
import HandleExternalPaymentWebhook from '../domain/useCases/Payment/handleExternalPaymentWebhook';
import ExternalPaymentWebhookController from '../controllers/order/externalPayment/webhook';
import MercadoPagoRepository from '../repositories/MercadoPagoRepository';

const router = express.Router();

const orderRepository = new OrderRepository();
const mercadoPagoRepository = new MercadoPagoRepository();

const handleMercadoPagoWebhook = new HandleExternalPaymentWebhook(orderRepository, mercadoPagoRepository);
const externalPaymentWebhookController = new ExternalPaymentWebhookController(handleMercadoPagoWebhook);

router.post('/mercadopago', (req, res) => externalPaymentWebhookController.handle(req, res));

export default router;