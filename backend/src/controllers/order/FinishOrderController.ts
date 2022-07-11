import { Request, Response } from "express";
import { FinishOrderService } from "../../services/order/FinishOrderService";

export class FinishOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const finishOrderService = new FinishOrderService();

    const order = await finishOrderService.execute({ order_id });

    return res.json(order);
  }
}
