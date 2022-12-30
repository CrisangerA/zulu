import RedisRepository from '../../shared/domain/redis.repository';
import { Product } from '../domain/model';
import ProductRepository from '../domain/repository';

export default class ProductUseCase {
  private repository: ProductRepository;
  private redis: RedisRepository;
  constructor(productRepository: ProductRepository, redisRepository: RedisRepository) {
    this.repository = productRepository;
    this.redis = redisRepository;
  }
  public static inject = ['productRepository', 'redisRepository'] as const;

  async GetProductById(id: string) {
    // Get Cached
    const cached = await this.redis.GetCached(id);
    if (cached) return JSON.parse(cached);
    // Make Request    
    const product = await this.repository.GetProductById(id);
    this.redis.SetCached(id, JSON.stringify(product));
    return product;
  }
  async GetAllProducts(query: string) {
    // Get Cached
    const cached = await this.redis.GetCached(query);    
    if (cached) return JSON.parse(cached);
    // Make Request
    let products = await this.repository.GetAllProducts(query);
    if (query.length > 0) {
      products = products.filter(p => p.title.toUpperCase().includes(query.toUpperCase()));
    }
    this.redis.SetCached(query, JSON.stringify(products));
    return products;
  }
  CreateNewProduct(product: Product) {
    return this.repository.CreateNewProduct(product);
  }
  DeleteProduct(id: string) {
    return this.repository.DeleteProduct(id);
  }
}
