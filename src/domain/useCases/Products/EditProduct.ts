import IProductRepository from "../../../repositories/interfaces/IProductRepository";
import { ECategory, ProductDTO } from "./ProductDTO";

class EditProduct {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string, productData: Omit<ProductDTO, 'updatedAt'>): Promise<ProductDTO | null> {
        if (!id) {
            throw new Error('Product ID is required');
        }

        if (typeof id !== 'string') {
            throw new Error('Product ID must be a string');
        }

        if (!productData) {
            throw new Error('Product data is required');
        }

        if (typeof productData !== 'object') {
            throw new Error('Product data must be an object');
        }

        if (productData.category && !(productData.category in ECategory)) {
            throw new Error('Invalid category');
        }

        return this.productRepository.updateProduct(id, { ...productData, updatedAt: new Date() });
    }
}

export default EditProduct;