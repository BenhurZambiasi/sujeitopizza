import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

export class ListOrderController {
  async handle(req: Request, res: Response) {
    const listOrderService = new ListOrderService();

    const order = await listOrderService.execute();

    return res.json(order);
  }
}
