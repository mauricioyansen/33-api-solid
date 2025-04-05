/**
 * @vitest-environment prisma
 */

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("CheckIn History (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list the history of check-ins", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        latitude: -27.123456,
        longitude: -49.123456,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        { gymId: gym.id, userId: user.id },
        { gymId: gym.id, userId: user.id },
      ],
    });

    const res = await request(app.server)
      .get("/check-ins/history")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toEqual(200);
    expect(res.body.checkIns).toEqual([
      expect.objectContaining({ gymId: gym.id, userId: user.id }),
      expect.objectContaining({ gymId: gym.id, userId: user.id }),
    ]);
  });
});
