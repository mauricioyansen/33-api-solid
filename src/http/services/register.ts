import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterServiceReq {
  name: string;
  email: string;
  password: string;
}

// SOLID

// D - Dependency Inversion Principle

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceReq) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    await this.usersRepository.create({ name, email, passwordHash });
  }
}
