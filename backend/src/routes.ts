import { Router } from "express";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

router.get("/me", isAthenticated, new DetailUserController().handle);

router.post("/category", isAthenticated, new CreateCategoryController().handle);

router.get(
  "/categories",
  isAthenticated,
  new ListCategoriesController().handle
);

router.post("/product", isAthenticated, new CreateProductController().handle);

export { router };
