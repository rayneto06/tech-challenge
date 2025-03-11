import axios from 'axios';

const mercadoPagoAxiosInstance = axios.create({
    baseURL: 'https://api.mercadopago.com',
    headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

export default mercadoPagoAxiosInstance;
