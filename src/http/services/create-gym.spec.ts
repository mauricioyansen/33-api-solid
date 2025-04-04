import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymService } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymService;

describe("Create Gym Service", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymService(gymsRepository); //suit under test
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Js Gym",
      description: null,
      phone: null,
      latitude: -22.9159176,
      longitude: -47.1027249,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
