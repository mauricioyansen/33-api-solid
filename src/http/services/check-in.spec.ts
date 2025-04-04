import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe("CheckIn Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository); //suit under test

    gymsRepository.items.push({
      id: "gym-01",
      title: "Js Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.9670912),
      longitude: new Decimal(-46.989312),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.9670912,
      userLongitude: -46.989312,
    });

    console.log(checkIn.createdAt);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in a day", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.9670912,
      userLongitude: -46.989312,
    });

    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -22.9670912,
        userLongitude: -46.989312,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice in a different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -22.9670912,
      userLongitude: -46.989312,
    });

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0));

    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -22.9670912,
        userLongitude: -46.989312,
      })
    ).resolves.toBeTruthy();
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Js Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-22.9159176),
      longitude: new Decimal(-47.1027249),
    });

    await expect(
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -22.9670912,
        userLongitude: -46.989312,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
