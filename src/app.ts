import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';

import { connectDB } from './config/mongo';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./config/swagger_output.json"

import customerRoutes from './api/customerRoutes';
import productRoutes from './api/productRoutes';
import orderRoutes from './api/orderRoutes';
import mercadoPagoRoutes from './api/mercadoPagoRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.get('/', (_req: any, res: any) => {
    res.send('Heartbeat OK 💥');
});

app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/mercadoPago', mercadoPagoRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
    console.log(`Tech Challenge running at http://localhost:${port} 🚀`);
});
