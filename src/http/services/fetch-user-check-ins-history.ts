import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInHistoryServiceReq {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryServiceRes {
  checkIns: CheckIn[];
}

export class FetchUserCheckInHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryServiceReq): Promise<FetchUserCheckInHistoryServiceRes> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
