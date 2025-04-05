import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymsServiceReq {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsServiceRes {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceReq): Promise<FetchNearbyGymsServiceRes> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
