/**
 * @vitest-environment prisma
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create CheckIn (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.123456,
        longitude: -49.123456,
      },
    });

    const res = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.123456,
        longitude: -49.123456,
      });

    expect(res.statusCode).toEqual(201);
  });
});
