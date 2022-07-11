import prismaClient from "../../prisma";

interface IOrderRequest {
  item_id: string;
}

export class RemoveItemService {
  async execute({ item_id }: IOrderRequest) {
    const item = await prismaClient.item.delete({ where: { id: item_id } });
    return item;
  }
}
