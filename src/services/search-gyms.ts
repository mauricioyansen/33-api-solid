import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymsServiceReq {
  query: string;
  page: number;
}

interface SearchGymsServiceRes {
  gyms: Gym[];
}

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceReq): Promise<SearchGymsServiceRes> {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
