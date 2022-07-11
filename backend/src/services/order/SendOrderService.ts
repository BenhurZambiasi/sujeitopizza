import prismaClient from "../../prisma";

interface IOrderRequest {
  order_id: string;
}

export class SendOrderService {
  async execute({ order_id }: IOrderRequest) {
    const order = await prismaClient.order.update({
      where: { id: order_id },
      data: {
        draft: false,
      },
    });
    return order;
  }
}
