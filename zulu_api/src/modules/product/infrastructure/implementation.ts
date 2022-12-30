import API_ROUTES from '../../../config/api.routes';
import fetch from '../../shared/infrastructure/https';
import { Product } from '../domain/model';
import ProductRepository from "../domain/repository";

export default class ProductRepositoryImpl implements ProductRepository {
  GetProductById(id: string) {
    return fetch<Product>({
      hostname: API_ROUTES.root,
      path: API_ROUTES.products.detail(id),
      method: 'GET',
    });
  }
  GetAllProducts(query: string) {
    return fetch<Product[]>({
      hostname: API_ROUTES.root,
      path: API_ROUTES.products.all,
      method: 'GET',
    });
  }
  CreateNewProduct(product: Product) {
    return fetch<Product>({
      hostname: API_ROUTES.root,
      path: API_ROUTES.products.all,
      method: 'POST',
    }, JSON.stringify(product));
  }
  DeleteProduct(id: string) {
    return fetch<Product>({
      hostname: API_ROUTES.root,
      path: API_ROUTES.products.detail(id),
      method: 'DELETE',
    });
  }
}
