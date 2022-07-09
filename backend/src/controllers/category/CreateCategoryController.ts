import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const createUserService = new CreateCategoryService();

    const category = await createUserService.execute({ name });

    return res.json(category);
  }
}
