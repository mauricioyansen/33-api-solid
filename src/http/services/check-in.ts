import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInServiceReq {
  userId: string;
  gymId: string;
}

interface CheckInServiceRes {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceReq): Promise<CheckInServiceRes> {
    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
