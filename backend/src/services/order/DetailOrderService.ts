import prismaClient from "../../prisma";

interface IOrderRequest {
  order_id: string;
}

export class DetailOrderService {
  async execute({ order_id }: IOrderRequest) {
    const order = await prismaClient.item.findMany({
      where: { order_id },
      include: {
        product: true,
        order: true,
      },
    });
    return order;
  }
}
