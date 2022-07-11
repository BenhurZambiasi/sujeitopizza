import prismaClient from "../../prisma";

interface IItemRequest {
  order_id: string;
  product_id: string;
  amount: number;
}

export class AddItemService {
  async execute({ order_id, product_id, amount }: IItemRequest) {
    const item = await prismaClient.item.create({
      data: { order_id, product_id, amount },
    });
    return item;
  }
}
