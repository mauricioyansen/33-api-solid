import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryService() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const service = new FetchUserCheckInsHistoryService(prismaCheckInRepository);

  return service;
}
