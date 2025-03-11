import { CustomerDTO } from "../domain/useCases/Customers/CustomerDTO";
import ICustomerRepository from "./interfaces/ICustomerRepository";
import { Customer } from '../interfaces/models/Customer';
import { Customer as CustomerEntity } from '../entities/customer';

class CustomerRepository implements ICustomerRepository {

    async createCustomer(customer: Partial<CustomerDTO>): Promise<CustomerEntity> {
        const newCustomer = new Customer(customer);
        await newCustomer.save();
        return new CustomerEntity(newCustomer.toObject());
    }

    async getCustomerById(id: string): Promise<CustomerEntity | null> {
        const customer = await Customer.findById(id);
        return customer ? new CustomerEntity(customer.toObject()) : null;
    }

    async getCustomerByEmail(email: string): Promise<CustomerEntity | null> {
        const customer = await Customer.findOne({ email });
        return customer ? new CustomerEntity(customer.toObject()) : null;
    }

    async getCustomerByCPF(cpf: string): Promise<CustomerEntity | null> {
        const customer = await Customer.findOne({ cpf });
        return customer ? new CustomerEntity(customer.toObject()) : null;
    }

    async updateCustomer(id: string, customer: Omit<Partial<CustomerDTO>, 'id'>): Promise<CustomerEntity | null> {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, { new: true });
        return updatedCustomer ? new CustomerEntity(updatedCustomer.toObject()) : null;
    }

    async deleteCustomer(id: string): Promise<void> {
        await Customer.findByIdAndDelete(id);
    }
}

export default CustomerRepository;
