import { makeValidateCheckInService } from "@/services/factories/make-validade-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validateController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });
  const { checkInId } = validateCheckInParamsSchema.parse(req.params);

  const validateCheckInService = makeValidateCheckInService();

  await validateCheckInService.execute({
    checkInId,
  });

  return res.status(204).send();
}
