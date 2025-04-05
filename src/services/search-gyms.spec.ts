import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsService } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe("Fetch CheckIn History Service", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(gymsRepository); //suit under test
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -22.9159176,
      longitude: -47.1027249,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -22.9159176,
      longitude: -47.1027249,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -22.9159176,
        longitude: -47.1027249,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
