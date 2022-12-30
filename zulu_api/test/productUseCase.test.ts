import {Product} from '../src/modules/product/domain/model';
import ProductRepository from '../src/modules/product/domain/repository';
import ProductUseCase from '../src/modules/product/application/useCase';
import RedisRepository from '../src/modules/shared/domain/redis.repository';

const mockProduct = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120
  }
}
class MockRedisRepository implements RedisRepository {
  GetCached(key: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  SetCached(key: string, data: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
}
class MockProductRepository implements ProductRepository {
  CreateNewProduct(product: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  DeleteProduct(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  GetProductById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  GetAllProducts(query: string): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}

describe('Fake Store API Data Source', () => {
  let mockProductUseCase: ProductUseCase;

  beforeAll(() => {
    mockProductUseCase = new ProductUseCase(new MockProductRepository(), new MockRedisRepository());
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /items", () => {
    test("GetAllProducts should return success", async () => {
      const ExpectedData = [mockProduct];
      jest.spyOn(mockProductUseCase, "GetAllProducts").mockImplementation(() => Promise.resolve(ExpectedData))
      const response = await mockProductUseCase.GetAllProducts('Laptop');
      expect(response).toStrictEqual(ExpectedData)
    });
    test("GetProductById should return success", async () => {
      const ExpectedData = mockProduct;
      jest.spyOn(mockProductUseCase, "GetProductById").mockImplementation(() => Promise.resolve(ExpectedData))
      const response = await mockProductUseCase.GetProductById('1');
      expect(response).toStrictEqual(ExpectedData)
    });
  })
});