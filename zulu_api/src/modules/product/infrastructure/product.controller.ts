import { BadRequestError } from '../../shared/domain/model';
import { Router, NextFunction, Request, Response } from 'express';
import ProductUseCase from '../application/useCase';

export default class ProductController {
  private router: Router;
  private useCase: ProductUseCase;
  constructor(productUseCase: ProductUseCase) {
    this.useCase = productUseCase;
    this.router = Router();
  }
  public static inject = ['productUseCase'] as const;

  private async GetById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.useCase.GetProductById(req.params.id);
      if (!product) throw new BadRequestError('Entity not found');
      return res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
  private async SearchItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      if (q === undefined) throw new BadRequestError('Invalid search query');
      const products = await this.useCase.GetAllProducts(q as string);
      return res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }
  private async CreateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.useCase.CreateNewProduct(req.body);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  private async DeleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.useCase.DeleteProduct(req.params.id);
      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }
  public routes(): Router {
    this.router.get('/items/:id', (req, res, next) => this.GetById(req, res, next));
    this.router.get('/items', (req, res, next) => this.SearchItem(req, res, next));
    this.router.post('/items', (req, res, next) => this.CreateProduct(req, res, next));
    this.router.delete('/items/:id', (req, res, next) => this.DeleteProduct(req, res, next));
    return this.router;
  }
}