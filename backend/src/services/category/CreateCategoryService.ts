import prismaClient from "../../prisma";

interface ICategoryRequest {
  name: string;
}

export class CreateCategoryService {
  async execute({ name }: ICategoryRequest) {
    if (!name || !name.trim()) {
      throw new Error("Name is required");
    }

    const category = await prismaClient.category.create({
      data: {
        name: name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return category;
  }
}
