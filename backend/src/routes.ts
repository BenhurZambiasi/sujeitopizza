import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoriesController } from "./controllers/category/ListCategoriesController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);

router.get("/me", isAthenticated, new DetailUserController().handle);

router.post("/category", isAthenticated, new CreateCategoryController().handle);

router.get(
  "/categories",
  isAthenticated,
  new ListCategoriesController().handle
);

router.post(
  "/product",
  isAthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
router.get("/products", isAthenticated, new ListByCategoryController().handle);

router.post("/order", isAthenticated, new CreateOrderController().handle);

router.delete("/order", isAthenticated, new RemoveOrderController().handle);

router.post("/order/add", isAthenticated, new AddItemController().handle);

export { router };
