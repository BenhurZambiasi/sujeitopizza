import { Router } from "express";
import { authRouter } from "./auth/auth.routes";
import { categoryRouter } from "./category/category.routes";
import { orderRouter } from "./order/order.routes";
import { productRouter } from "./products/product.routes";
import { userRouter } from "./user/user.routes";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(categoryRouter);
router.use(orderRouter);
router.use(productRouter);

export { router };
