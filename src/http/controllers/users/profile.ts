import { makeGetUserProfileService } from "@/services/factories/make-get-user-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profileController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  });

  const { passwordHash, ...userWithoutPassword } = user;

  return res.status(200).send({ ...userWithoutPassword });
}
