import prismaClient from "../../prisma";

interface IDetailequest {
  user_id: string;
}

export class DetailUserService {
  async execute({ user_id }: IDetailequest) {
    const user = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: { id: true, name: true, email: true },
    });

    return user;
  }
}
