import express from 'express';
import ProductRepository from '../repositories/ProductRepository';
import IProductRepository from '../repositories/interfaces/IProductRepository';
import CreateProduct from '../domain/useCases/Products/CreateProduct';
import ViewProduct from '../domain/useCases/Products/ViewProduct';
import EditProduct from '../domain/useCases/Products/EditProduct';
import DeleteProduct from '../domain/useCases/Products/DeleteProduct';
import { ECategory } from '../domain/useCases/Products/ProductDTO';

const router = express.Router();

const productRepository = new ProductRepository();
const createProduct = new CreateProduct(productRepository as IProductRepository);
const viewProduct = new ViewProduct(productRepository as IProductRepository);
const editProduct = new EditProduct(productRepository as IProductRepository);
const deleteProduct = new DeleteProduct(productRepository as IProductRepository);

// GET /api/products - List all products
router.get('/', async (req, res) => {
    try {
        const products = await viewProduct.getAllProducts();
        res.json(products);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products/category/:category - List products by category
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await viewProduct.executeByCategory(category as ECategory);
        res.json(products);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await viewProduct.execute(id);
        res.json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const product = await createProduct.execute(productData);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/products/:id - Update a product
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;
        const product = await editProduct.execute(id, productData);
        res.json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProduct.execute(id);
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
