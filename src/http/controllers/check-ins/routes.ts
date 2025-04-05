import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

import { validateController } from "./validate";
import { createController } from "./create";
import { historyController } from "./history";
import { metricsController } from "./metrics";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", historyController);
  app.get("/check-ins/metrics", metricsController);
  app.post("/gyms/:gymId/check-ins", createController);
  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateController
  );
}
