
interface CustomerData {
    name: string;
    email: string;
    cpf: string;
}
export class Customer {
    readonly #name;
    readonly #email;
    readonly #cpf;

    
    constructor({ name, email, cpf }:CustomerData) {
        this.#name = name;
        this.#email = email;
        this.#cpf = cpf;
    }
    get name(): string {
        return this.#name
    }
    get email(): string {
        return this.#email
    }
    get cpf(): string {
        return this.#cpf
    }
}