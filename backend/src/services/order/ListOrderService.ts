import prismaClient from "../../prisma";

export class ListOrderService {
  async execute() {
    const order = await prismaClient.order.findMany({
      where: { draft: false, status: false },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        table: true,
        status: true,
        name:true,
        draft:true,
      },
    });
    return order;
  }
}
