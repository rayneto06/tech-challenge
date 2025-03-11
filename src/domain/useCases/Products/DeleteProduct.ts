import IProductRepository from '../../../repositories/interfaces/IProductRepository';

class DeleteProduct {
    constructor(private productRepository: IProductRepository) { }

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new Error('Product ID is required');
        }

        return this.productRepository.deleteProduct(id);
    }
}

export default DeleteProduct;