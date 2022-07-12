import prismaClient from "../../prisma";

interface ICategoryRequest {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: ICategoryRequest) {
    if (!name || !name.trim()) {
      throw new Error("Name is required");
    }
    const hasCategory = await prismaClient.category.findFirst({
      where: { name: name.toLowerCase() },
    });

    if (hasCategory) {
      throw new Error("Category already exists");
    }

    const category = await prismaClient.category.create({
      data: {
        name: name.toLowerCase(),
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}
