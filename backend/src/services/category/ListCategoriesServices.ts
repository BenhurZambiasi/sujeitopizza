import prismaClient from "../../prisma";

export class ListCategoriesServices {
  async execute() {
    const category = await prismaClient.category.findMany({
      select: { id: true, name: true },
    });
    return category;
  }
}
