export interface CustomerCreatedDTO {
    name: string;
    email: string;
    cpf: string;
}

export class CustomerCreatedOutput {
    readonly name: string;
    readonly email: string;
    readonly cpf: string;
    

    constructor({ name, email, cpf }: CustomerCreatedDTO) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
    }
}