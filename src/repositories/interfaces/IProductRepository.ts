import { ProductDTO, ECategory } from '../../domain/useCases/Products/ProductDTO';
import { IProduct } from '../../interfaces/IProduct';

interface IProductRepository {
    getAllProducts(): Promise<IProduct[] | null>;
    getProductById(id: string): Promise<IProduct | null>;
    getProductsByCategory(category: ECategory): Promise<IProduct[]>;
    createProduct(product: ProductDTO): Promise<IProduct>;
    updateProduct(id: string, product: ProductDTO): Promise<IProduct | null>;
    deleteProduct(id: string): Promise<void>;
}

export default IProductRepository;