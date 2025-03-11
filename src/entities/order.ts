import { ICustomer } from "../interfaces/ICustomer";

export interface ProductDTO {
    category: ECategory;
    name: string;
    price: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    isEnabled: boolean;
}

export enum OrderStatus {
    RECEBIDO = 'recebido',
    PREPARANDO = 'preparando',
    PRONTO = 'pronto',
    FINALIZADO = 'finalizado',
}

export enum PaymentStatus {
    PENDENTE = 'pendente',
    PAGO = 'pago',
    CANCELADO = 'cancelado',
}

export enum ECategory {
    LANCHE = 'lanche',
    ACOMPANHAMENTO = 'acompanhamento',
    BEBIDA = 'bebida',
    SOBREMESA = 'sobremesa',
}

export interface Combo {
    [ECategory.LANCHE]?: ProductDTO;
    [ECategory.ACOMPANHAMENTO]?: ProductDTO;
    [ECategory.BEBIDA]?: ProductDTO;
    [ECategory.SOBREMESA]?: ProductDTO;
}

interface OrderData {
    _id?: string;
    combo: Combo;
    total?: number;
    customer?: ICustomer;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
}


export class Order {
    readonly #_id;
    readonly #combo;
    readonly #total;
    readonly #status;
    readonly #paymentStatus;
    readonly #customer;
    readonly #createdAt;
    readonly #updatedAt;

    
    constructor({ combo, status, _id, customer, createdAt, updatedAt, paymentStatus }: OrderData) {
        this.#_id = _id
        this.#combo = combo;
        this.#total = this.calculateTotal();
        this.#status = status;
        this.#paymentStatus = paymentStatus;
        this.#customer = customer;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }
    get _id(): string | undefined {
        return this.#_id
    }
    get combo(): Combo {
        return this.#combo
    }

    get total(): number {
        return this.#total
    }

    get status(): OrderStatus {
        return this.#status
    }

    get paymentStatus(): PaymentStatus {
        return this.#paymentStatus;
    }
    
    get customer(): ICustomer | undefined {
        return this.#customer
    }

    get createdAt(): Date {
        return this.#createdAt
    }
       
    get updatedAt(): Date {
        return this.#updatedAt
    }

    calculateTotal(): number {
        const total = Object.values(this.combo).reduce((sum, item) => {
            return sum + (item?.price || 0);
        }, 0);
        return total;
    }

    mapPaymentStatusToOrderStatus(paymentStatus: string): { paymentOrderStatus: PaymentStatus, orderStatus: OrderStatus } | "UNKNOWN" {
        switch (paymentStatus) {
            case 'approved': return ({ paymentOrderStatus: PaymentStatus.PAGO, orderStatus: OrderStatus.PREPARANDO });
            case 'pending': return ({ paymentOrderStatus: PaymentStatus.PENDENTE, orderStatus: OrderStatus.RECEBIDO });
            case 'rejected': return ({ paymentOrderStatus: PaymentStatus.CANCELADO, orderStatus: OrderStatus.FINALIZADO });
            default: return 'UNKNOWN';
        }
    }
}