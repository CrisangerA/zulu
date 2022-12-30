import RedisRepositoryImpl from '../modules/shared/infrastructure/redis.implement';
import {createInjector, Scope} from 'typed-inject';
import ProductUseCase from '../modules/product/application/useCase';
import ProductRepositoryImpl from '../modules/product/infrastructure/implementation';

const injector = createInjector()
  .provideClass('redisRepository', RedisRepositoryImpl, Scope.Singleton)
  .provideClass('productRepository', ProductRepositoryImpl, Scope.Singleton)
  .provideClass('productUseCase', ProductUseCase, Scope.Singleton);

export default injector;