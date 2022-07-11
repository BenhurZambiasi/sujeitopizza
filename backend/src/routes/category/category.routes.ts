import { Router } from "express";
import { CreateCategoryController } from "../../controllers/category/CreateCategoryController";
import { ListCategoriesController } from "../../controllers/category/ListCategoriesController";
import { isAthenticated } from "../../middlewares/isAuthenticated";

const categoryRouter = Router();
categoryRouter.post(
  "/category",
  isAthenticated,
  new CreateCategoryController().handle
);

categoryRouter.get(
  "/categories",
  isAthenticated,
  new ListCategoriesController().handle
);

export { categoryRouter };
