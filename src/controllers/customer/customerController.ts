import CustomerRepository from '../../repositories/CustomerRepository';
import CreateCustomer from '../../domain/useCases/Customers/CreateCustomer';
import ViewCustomer from '../../domain/useCases/Customers/ViewCustomer';
import ICustomerRepository from '../../repositories/interfaces/ICustomerRepository';
import { CreateCustomerDTO } from './dtos/input/createCustomer.dto';
import { CustomerCreatedOutput } from './dtos/output/customerCreated.dto';
import { FindCustomerByCPFOutput } from './dtos/output/FindCustomerByCPF.dto';
import { FindCustomerByIdOutput } from './dtos/output/FindCustomerById.dto';
import { FindCustomerByEmailOutput } from './dtos/output/FindCustomerByEmail.dto';



//TODO: Dividir controller ? 
export class CustomerController {
    readonly createCustomerUseCase: CreateCustomer
    readonly viewCustomerUseCases: ViewCustomer
    constructor(customerRepository: ICustomerRepository) {
        this.createCustomerUseCase = new CreateCustomer(customerRepository as ICustomerRepository);
        this.viewCustomerUseCases = new ViewCustomer(customerRepository as ICustomerRepository);
        
    }
    async createCustomer({ cpf, email, name }: CreateCustomerDTO): Promise<CustomerCreatedOutput> {
        const customer = await this.createCustomerUseCase.execute({ cpf, email, name });
        return new CustomerCreatedOutput(customer);
    }

    async findCustomerById({ id }: {id: string}): Promise<FindCustomerByIdOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerById(id);
        return new FindCustomerByCPFOutput(customer)
    }

    async findCustomerByCPF({ cpf  }: {cpf: string}): Promise<FindCustomerByCPFOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerByCPF(cpf);
        return new FindCustomerByCPFOutput(customer)
    }

    async findCustomerByEmail({ email }: { email: string}): Promise<FindCustomerByEmailOutput> {
        const customer = await this.viewCustomerUseCases.findCustomerByEmail(email);
        return new FindCustomerByEmailOutput(customer)
    }
}