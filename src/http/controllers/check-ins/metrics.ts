import { makeGetUserMetricsService } from "@/services/factories/make-get-user-metrics-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function metricsController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const getUserMetricsService = makeGetUserMetricsService();

  const { checkInsCount } = await getUserMetricsService.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({ checkInsCount });
}
