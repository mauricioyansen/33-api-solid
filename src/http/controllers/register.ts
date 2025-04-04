import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../services/errors/user-already-exists-error";
import { makeRegisterService } from "../services/factories/make-register-service";

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
    const registerService = makeRegisterService();

    await registerService.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError)
      return res.status(409).send({ message: error.message });

    throw error;
  }

  return res.status(201).send();
}
