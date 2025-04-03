import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "../services/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "../services/errors/user-already-exists-error";

export async function registerController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = userBodySchema.parse(req.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();

    const registerService = new RegisterService(prismaUsersRepository);

    await registerService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return res.status(409).send({ message: error.message });

    throw error;
  }

  return res.status(201).send();
}
