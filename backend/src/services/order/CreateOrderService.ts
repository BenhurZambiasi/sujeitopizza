import prismaClient from "../../prisma";

interface IOrderRequest {
  table: number;
  name: string;
}
export class CreateOrderService {
  async execute({ name, table }: IOrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table,
        name,
      },
    });
    return order;
  }
}
