interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export class ProductValue implements Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;

  constructor({ id, title, price, description, category, image, rating }: Product) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.rating = rating;
  }

  public static toProduct(json: string): Product {
    return JSON.parse(json);
  }

  public static productToJson(value: Product): string {
    return JSON.stringify(value);
  }
}
