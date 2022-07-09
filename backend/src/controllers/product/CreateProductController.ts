import { Request, Response } from "express";

import { CreateProductService } from "../../services/product/CreateProductService";

export class CreateProductController {
  async handle(req: Request, res: Response) {
    const { category_id, description, name, price } = req.body;
    const createProductService = new CreateProductService();
    if (!req.file) {
      throw new Error("error upload file");
    } else {
      const { filename: banner, originalname } = req.file;
      const product = await createProductService.execute({
        banner,
        category_id,
        description,
        name,
        price,
      });

      return res.status(201).json(product);
    }
  }
}
