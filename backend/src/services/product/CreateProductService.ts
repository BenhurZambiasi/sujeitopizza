import prismaClient from "../../prisma";

interface IProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

export class CreateProductService {
  async execute({
    banner,
    category_id,
    description,
    name,
    price,
  }: IProductRequest) {
    return { ok: true };
  }
}
