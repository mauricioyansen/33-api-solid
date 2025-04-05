/**
 * @vitest-environment prisma
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Js Gym",
        description: "JavaScript Gym",
        phone: "(00) 98765-4321",
        latitude: -22.9670913,
        longitude: -46.989313,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ts Gym",
        description: "TypeScript Gym",
        phone: "(00) 98765-4321",
        latitude: -22.9159176,
        longitude: -47.1027249,
      });

    const res = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -22.9670913, longitude: -46.989313 })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.gyms).toHaveLength(1);
    expect(res.body.gyms).toEqual([
      expect.objectContaining({ title: "Js Gym" }),
    ]);
  });
});
