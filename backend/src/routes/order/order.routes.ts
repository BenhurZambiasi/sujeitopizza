import { Router } from "express";
import { AddItemController } from "../../controllers/order/AddItemController";
import { CreateOrderController } from "../../controllers/order/CreateOrderController";
import { DetailOrderController } from "../../controllers/order/DetailOrderController";
import { FinishOrderController } from "../../controllers/order/FinishOrderController";
import { ListOrderController } from "../../controllers/order/ListOrderController";
import { RemoveItemController } from "../../controllers/order/RemoveItemController";
import { RemoveOrderController } from "../../controllers/order/RemoveOrderController";
import { SendOrderController } from "../../controllers/order/SendOrderController";
import { isAthenticated } from "../../middlewares/isAuthenticated";

const orderRouter = Router();

orderRouter.post("/order", isAthenticated, new CreateOrderController().handle);

orderRouter.put("/order", isAthenticated, new SendOrderController().handle);

orderRouter.put(
  "/order/finish",
  isAthenticated,
  new FinishOrderController().handle
);

orderRouter.get("/orders", isAthenticated, new ListOrderController().handle);

orderRouter.get("/order", isAthenticated, new DetailOrderController().handle);

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
