// src/api/orderRoutes.ts
import express, { Request, Response } from 'express';
import OrderRepository from '../repositories/OrderRepository';
import IOrderRepository from '../repositories/interfaces/IOrderRepository';
import CreateOrder from '../domain/useCases/Order/CreateOrder';
import CheckPaymentStatus from '../domain/useCases/Order/CheckPaymentStatus';
import HandlePaymentWebhook from '../domain/useCases/Order/HandlePaymentWebhook';
import ListOrders from '../domain/useCases/Order/ListOrders';
import UpdateOrderStatus from '../domain/useCases/Order/UpdateOrderStatus';

const router = express.Router();

const orderRepository = new OrderRepository();
const createOrder = new CreateOrder(orderRepository as IOrderRepository);
const checkPaymentStatus = new CheckPaymentStatus(orderRepository as IOrderRepository);
const handlePaymentWebhook = new HandlePaymentWebhook(orderRepository as IOrderRepository);
const listOrders = new ListOrders(orderRepository as IOrderRepository);
const updateOrderStatus = new UpdateOrderStatus(orderRepository as IOrderRepository);

// Endpoint: Checkout Order (Create Order)
router.post('/checkout', async (req: Request, res: Response) => {
    try {
        const orderData = req.body; // should include products, customer, etc.
        const newOrder = await createOrder.execute(orderData);
        res.status(201).json({ orderId: newOrder._id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint: Consult Payment Status for an Order
router.get('/:id/payment-status', async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const paymentStatus = await checkPaymentStatus.execute(orderId);
        res.json({ paymentStatus });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint: Webhook to receive payment confirmation (mock)
router.post('/webhook', async (req: Request, res: Response) => {
    try {
        const payload = req.body; // expected: { orderId: string, paymentStatus: 'aprovado' | 'recusado' }
        await handlePaymentWebhook.execute(payload);
        res.status(200).json({ message: 'Webhook processed' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint: List Orders (excluding finalized), sorted by custom criteria
router.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await listOrders.execute();
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Endpoint: Update Order Status (for updating the flow)
router.put('/:id/status', async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body; // new status, e.g., 'emPreparacao', 'pronto', etc.
        const updatedOrder = await updateOrderStatus.execute(orderId, status);
        res.json(updatedOrder);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
