/**
 * @vitest-environment prisma
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to filter a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Js Gym",
        description: "JavaScript Gym",
        phone: "(00) 98765-4321",
        latitude: -27.123456,
        longitude: -49.123456,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ts Gym",
        description: "TypeScript Gym",
        phone: "(00) 98765-4321",
        latitude: -27.123456,
        longitude: -49.123456,
      });

    const res = await request(app.server)
      .get("/gyms/search")
      .query({ query: "Js" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.gyms).toHaveLength(1);
    expect(res.body.gyms).toEqual([
      expect.objectContaining({ title: "Js Gym" }),
    ]);
  });
});
