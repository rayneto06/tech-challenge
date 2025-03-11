import { Customer } from '../../../entities/customer';
import ICustomerRepository from '../../../repositories/interfaces/ICustomerRepository';
import { CustomerDTO } from './CustomerDTO';

class ViewCustomer {
    //TODO: Manter apenas um caso de uso por classe
    constructor(private customerRepository: ICustomerRepository) { }

    async findCustomerById(id: string): Promise<Customer> {
        if (!id) {
            throw new Error('You must provide a valid ID to search for customers');
        }

        let customer: Customer | null = null;
        customer = await this.customerRepository.getCustomerById(id);

        if (!customer) {
            throw new Error('Customer not found.');
        }

        return customer;
    }

    async findCustomerByEmail(email: string): Promise<Customer> {
        if (!email) {
            throw new Error('You must provide a valid email to search for customers');
        }

        let customer: Customer | null = null;
        customer = await this.customerRepository.getCustomerByEmail(email);

        if (!customer) {
            throw new Error('Customer not found.');
        }

        return customer;
    }

    async findCustomerByCPF(cpf: string): Promise<Customer> {
        if (!cpf) {
            throw new Error('You must provide a valid CPF to search for customers');
        }

        let customer: Customer | null = null;
        customer = await this.customerRepository.getCustomerByCPF(cpf);

        if (!customer) {
            throw new Error('Customer not found.');
        }

        return customer;
    }
}

export default ViewCustomer;