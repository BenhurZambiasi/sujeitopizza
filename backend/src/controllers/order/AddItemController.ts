import { Request, Response } from "express";
import { AddItemService } from "../../services/order/AddItemService";

interface IItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}
export class AddItemController {
  async handle(req: Request, res: Response) {
    const { itens } = req.body;
    const addItemService = new AddItemService();

    itens.forEach(async (element: IItemRequest) => {
      await addItemService.execute({
        order_id: element.order_id,
        product_id: element.product_id,
        amount: element.amount,
      });
    });

    return res.status(201).json({ message: "itens added successfully" });
  }
}
