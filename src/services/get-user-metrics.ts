import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsServiceReq {
  userId: string;
}

interface GetUserMetricsServiceRes {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceReq): Promise<GetUserMetricsServiceRes> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
