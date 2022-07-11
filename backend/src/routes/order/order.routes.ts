import { Router } from "express";
import { AddItemController } from "../../controllers/order/AddItemController";
import { CreateOrderController } from "../../controllers/order/CreateOrderController";
import { RemoveItemController } from "../../controllers/order/RemoveItemController";
import { RemoveOrderController } from "../../controllers/order/RemoveOrderController";
import { isAthenticated } from "../../middlewares/isAuthenticated";

const orderRouter = Router();

orderRouter.post("/order", isAthenticated, new CreateOrderController().handle);

orderRouter.delete(
  "/order",
  isAthenticated,
  new RemoveOrderController().handle
);

orderRouter.post("/order/add", isAthenticated, new AddItemController().handle);

orderRouter.delete(
  "/order/remove/item",
  isAthenticated,
  new RemoveItemController().handle
);

export { orderRouter };
