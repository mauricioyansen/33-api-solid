import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../services/authenticate";
import { InvalidCredentialsError } from "../services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "../services/factories/make-authenticate-service";

export async function authenticateController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateService = makeAuthenticateService();

    await authenticateService.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError)
      return res.status(400).send({ message: error.message });

    throw error;
  }

  return res.status(200).send();
}
