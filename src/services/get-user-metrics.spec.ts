import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsService } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Get User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository); //suit under test
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      gymId: "gym-01",
      userId: "user-01",
    });

    await checkInsRepository.create({
      gymId: "gym-02",
      userId: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
