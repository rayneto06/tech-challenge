import express, { Request, Response } from 'express';
import { CustomerController } from '../controllers/customer/customerController';
import CustomerRepository from '../repositories/CustomerRepository';

const router = express.Router();
const customerRepository = new CustomerRepository();
const customerController = new CustomerController(customerRepository);

// Create Customer
router.post('/', async (req: Request, res: Response) => {
    try {
        const { cpf, email, name } = req.body;
        const customer = await customerController.createCustomer({ cpf, email, name });
        res.status(201).json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// List All Customers
router.get('/', async (req: Request, res: Response) => {
    try {
        const customers = await customerController.listAllCustomers();
        res.json(customers);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get Customer by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const customer = await customerController.findCustomerById({ id });
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get Customer by CPF
router.get('/cpf/:cpf', async (req: Request, res: Response) => {
    try {
        const cpf = req.params.cpf;
        const customer = await customerController.findCustomerByCPF({ cpf });
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Get Customer by Email
router.get('/email/:email', async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const customer = await customerController.findCustomerByEmail({ email });
        res.json(customer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Update Customer
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedCustomer = await customerController.updateCustomer({ id, customerData: req.body });
        res.json(updatedCustomer);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Customer
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await customerController.deleteCustomer({ id });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
