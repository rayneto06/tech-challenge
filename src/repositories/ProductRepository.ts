import { ECategory, ProductDTO } from "../domain/useCases/Products/ProductDTO";
import { IProduct } from "../interfaces/IProduct";
import { Product } from "../interfaces/models/Product";
import IProductRepository from "./interfaces/IProductRepository";

class ProductRepository implements IProductRepository {
    async createProduct(product: Partial<ProductDTO>): Promise<IProduct> {
        const newProduct = new Product(product);
        await newProduct.save();
        return newProduct;
    }

    async getAllProducts(): Promise<IProduct[] | null> {
        const products = await Product.find();
        return products.map(product => product.toObject());
    }

    async getProductById(id: string): Promise<IProduct | null> {
        const product = await Product.findById(id);
        return product ? product.toObject() : null;
    }

    async getProductsByCategory(category: string): Promise<IProduct[]> {
        const products = await Product.find({ category: category as ECategory });
        return products.map(product => product.toObject());
    }

    async updateProduct(id: string, product: Omit<Partial<ProductDTO>, 'id'>): Promise<IProduct | null> {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return updatedProduct ? updatedProduct.toObject() : null;
    }

    async deleteProduct(id: string): Promise<void> {
        await Product.findByIdAndDelete(id);
    }
}

export default ProductRepository;
