import { Request, Response } from "express";

import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const { category_id, description, name, price } = req.body;
    let banner = "";
    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      banner,
      category_id,
      description,
      name,
      price,
    });

    return res.json(product);
  }
}
