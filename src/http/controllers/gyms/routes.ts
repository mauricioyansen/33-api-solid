import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { searchController } from "./search";
import { nearbyController } from "./nearby";
import { createController } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchController);
  app.get("/gyms/nearby", nearbyController);
  app.post("/gyms", createController);
}
