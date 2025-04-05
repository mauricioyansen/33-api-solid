import { GetUserMetricsService } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsService() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const service = new GetUserMetricsService(prismaCheckInRepository);

  return service;
}
