import { Customer } from '../../entities/customer';

interface ICustomerRepository {
    [key: string]: any; // for dynamic access to properties
    createCustomer(customer: Partial<Customer>): Promise<Customer>;
    getCustomerById(id: string): Promise<Customer | null>;
    getCustomerByEmail(email: string): Promise<Customer | null>;
    getCustomerByCPF(cpf: string): Promise<Customer | null>;
    updateCustomer(id: string, customer: Omit<Partial<Customer>, 'id'>): Promise<Customer | null>;
    deleteCustomer(id: string): Promise<void>;
}

export default ICustomerRepository;