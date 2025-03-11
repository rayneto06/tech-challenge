import express, { Request, Response } from 'express';
import { CustomerController } from '../controllers/customer/customerController';
import CustomerRepository from '../repositories/CustomerRepository';

const router = express.Router();
const customerRepository = new CustomerRepository();
router.post('/', async (req: Request, res: Response) => {
    try {
        const { cpf, email, name } = req.body;
        const customer = new CustomerController(customerRepository).createCustomer({cpf, email, name });
        res.status(201).json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const customer = new CustomerController(customerRepository).findCustomerById({id});
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/cpf/:cpf', async (req: Request, res: Response) => {
    try {
        const cpf = req.params.cpf;
        const customer = new CustomerController(customerRepository).findCustomerByCPF({cpf});
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/email/:email', async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const customer = new CustomerController(customerRepository).findCustomerByEmail({email});
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;