import ICustomerRepository from '../../repositories/interfaces/ICustomerRepository';
import CreateCustomer from '../../domain/useCases/Customers/CreateCustomer';
import ViewCustomer from '../../domain/useCases/Customers/ViewCustomer';
import { CreateCustomerDTO } from './dtos/input/createCustomer.dto';
import { CustomerCreatedOutput } from './dtos/output/customerCreated.dto';
import { FindCustomerByCPFOutput } from './dtos/output/FindCustomerByCPF.dto';
import { FindCustomerByIdOutput } from './dtos/output/FindCustomerById.dto';
import { FindCustomerByEmailOutput } from './dtos/output/FindCustomerByEmail.dto';

export class CustomerController {
    private customerRepository: ICustomerRepository;
    readonly createCustomerUseCase: CreateCustomer;
    readonly viewCustomerUseCases: ViewCustomer;

    constructor(customerRepository: ICustomerRepository) {
        this.customerRepository = customerRepository;
        this.createCustomerUseCase = new CreateCustomer(customerRepository);
        this.viewCustomerUseCases = new ViewCustomer(customerRepository);
    }

    async createCustomer({ cpf, email, name }: CreateCustomerDTO): Promise<CustomerCreatedOutput> {
        const customer = await this.createCustomerUseCase.execute({ cpf, email, name });
        return new CustomerCreatedOutput(customer);
    }

    async findCustomerById({ id }: { id: string }): Promise<FindCustomerByIdOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerById(id);
        return new FindCustomerByIdOutput(customer);
    }

    async findCustomerByCPF({ cpf }: { cpf: string }): Promise<FindCustomerByCPFOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerByCPF(cpf);
        return new FindCustomerByCPFOutput(customer);
    }

    async findCustomerByEmail({ email }: { email: string }): Promise<FindCustomerByEmailOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerByEmail(email);
        return new FindCustomerByEmailOutput(customer);
    }

    async listAllCustomers(): Promise<any> {
        return this.customerRepository.getAllCustomers();
    }

    async updateCustomer({
        id,
        customerData
    }: {
        id: string;
        customerData: Partial<Omit<CreateCustomerDTO, 'id'>>;
    }): Promise<CustomerCreatedOutput> {
        const updatedCustomer = await this.customerRepository.updateCustomer(id, customerData);
        return new CustomerCreatedOutput(updatedCustomer);
    }

    async deleteCustomer({ id }: { id: string }): Promise<void> {
        await this.customerRepository.deleteCustomer(id);
    }
}
