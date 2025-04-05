import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInService } from "../check-in";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInService() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(
    prismaCheckInRepository,
    prismaGymsRepository
  );

  return service;
}
