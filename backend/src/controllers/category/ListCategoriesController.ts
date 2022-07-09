import { Request, Response } from "express";

import { ListCategoriesServices } from "../../services/category/ListCategoriesServices";

export class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoriesService = new ListCategoriesServices();

    const categories = await listCategoriesService.execute();

    return res.json(categories);
  }
}
