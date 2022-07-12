import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../config/multer";

import { CreateProductController } from "../../controllers/product/CreateProductController";
import { ListByCategoryController } from "../../controllers/product/ListByCategoryController";
import { isAthenticated } from "../../middlewares/isAuthenticated";

const upload = multer(uploadConfig.upload("./tmp"));

const productRouter = Router();
productRouter.post(
  "/product",
  isAthenticated,
  upload.single("file"),
  new CreateProductController().handle
);
productRouter.get(
  "/products",
  isAthenticated,
  new ListByCategoryController().handle
);
export { productRouter };
