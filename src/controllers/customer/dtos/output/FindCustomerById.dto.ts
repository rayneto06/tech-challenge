export interface CustomerViewDTO {
    name: string;
    email: string;
    cpf: string;
}

export class FindCustomerByIdOutput {
    readonly name: string;
    readonly email: string;
    readonly cpf: string;
    

    constructor({ name, email, cpf }: CustomerViewDTO) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }
}