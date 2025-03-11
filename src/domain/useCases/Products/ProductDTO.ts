export enum ECategory {
    LANCHE = 'lanche',
    ACOMPANHAMENTO = 'acompanhamento',
    BEBIDA = 'bebida',
    SOBREMESA = 'sobremesa',
}

export interface ProductDTO {
    category: ECategory;
    name: string;
    price: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    isEnabled: boolean;
}