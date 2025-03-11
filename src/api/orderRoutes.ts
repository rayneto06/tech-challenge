import express, { Request, Response } from 'express';
import OrderRepository from '../repositories/OrderRepository';
import { OrderController } from '../controllers/order/orderController';
import MercadoPagoRepository from '../repositories/MercadoPagoRepository';

const router = express.Router();

const orderRepository = new OrderRepository();
const mercadoPagoRepository = new MercadoPagoRepository();

router.post('/', async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const order = await new OrderController(orderRepository, mercadoPagoRepository).createOrder(orderData);
        if (order._id) {
            const orderPaymentQRCode = await new OrderController(orderRepository, mercadoPagoRepository).createOrderPaymentQRCode({ orderId: order._id });
            res.status(201).json({ order_identifier: order._id, orderPaymentQRCode });
        } else {
            throw new Error('Erro ao criar pedido');
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id/qrcode', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const orderPaymentQRCode = await new OrderController(orderRepository, mercadoPagoRepository).createOrderPaymentQRCode({ orderId: id });
        res.json(orderPaymentQRCode);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const orders = await new OrderController(orderRepository, mercadoPagoRepository).viewAllOrders();
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = await new OrderController(orderRepository, mercadoPagoRepository).viewOrder({ id });
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id/status', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const orderStatus = await new OrderController(orderRepository, mercadoPagoRepository).viewOrderStatus({ id });
        res.json(orderStatus);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/active', async (req: Request, res: Response) => {
    try {
        const orders = await new OrderController(orderRepository, mercadoPagoRepository).viewActiveOrders();
        res.json(orders);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const orderData = req.body;
        const order = await new OrderController(orderRepository, mercadoPagoRepository).editOrder({ id, orderData });
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id/status', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { orderStatus, paymentStatus } = req.body;
        const order = await new OrderController(orderRepository, mercadoPagoRepository).editOrderStatus({ id, orderStatus, paymentStatus });
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;