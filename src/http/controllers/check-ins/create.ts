import { makeCheckInService } from "@/services/factories/make-check-in-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createController(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const createCheckInService = makeCheckInService();

  await createCheckInService.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(201).send();
}
