import { Customer } from '../../../entities/customer';
import ICustomerRepository from '../../../repositories/interfaces/ICustomerRepository';
import { CustomerDTO } from './CustomerDTO';

class CreateCustomer {
    constructor(private customerRepository: ICustomerRepository) { }

    async execute(customerData: Omit<CustomerDTO, 'updatedAt'>): Promise<Customer> {
        const createdAt = new Date();
        const updatedAt = createdAt;
        const customer: CustomerDTO = {
            ...customerData,
            createdAt,
            updatedAt,
        };

        const newCustomer = await this.customerRepository.createCustomer(customer);
        return new Customer(newCustomer)
    }
}

export default CreateCustomer;