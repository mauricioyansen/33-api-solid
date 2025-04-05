import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileServiceReq {
  userId: string;
}

interface GetUserProfileServiceRes {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceReq): Promise<GetUserProfileServiceRes> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new ResourceNotFoundError();

    return { user };
  }
}
