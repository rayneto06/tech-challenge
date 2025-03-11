import IProductRepository from '../../../repositories/interfaces/IProductRepository';
import { ProductDTO } from './ProductDTO';

class CreateProduct {
    constructor(private productRepository: IProductRepository) { }

    async execute(productData: Omit<ProductDTO, 'createdAt' | 'updatedAt' | 'isEnabled'>): Promise<ProductDTO> {
        const createdAt = new Date();
        const updatedAt = createdAt;
        const customer: ProductDTO = {
            ...productData,
            createdAt,
            updatedAt,
            isEnabled: true
        };

        return this.productRepository.createProduct(customer);
    }
}

export default CreateProduct;