import { Product } from './model';

export default interface ProductRepository {
  GetProductById(id: string): Promise<Product>;
  GetAllProducts(query: string): Promise<Product[]>;
  CreateNewProduct(product: Product): Promise<Product>;
  DeleteProduct(id: string): Promise<Product>;
}
