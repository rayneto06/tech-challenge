import IProductRepository from '../../../repositories/interfaces/IProductRepository';
import { ProductDTO, ECategory } from './ProductDTO';

class ViewProduct {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<ProductDTO | null> {
        if (!id) {
            throw new Error('Product ID is required');
        }

        if (typeof id !== 'string') {
            throw new Error('Product ID must be a string');
        }

        return this.productRepository.getProductById(id);
    }

    async executeByCategory(category: ECategory): Promise<ProductDTO[]> {
        if (!category) {
            throw new Error('Category is required');
        }

        if (!(category in ECategory)) {
            throw new Error('Invalid category');
        }

        return this.productRepository.getProductsByCategory(category);
    }
}

export default ViewProduct;