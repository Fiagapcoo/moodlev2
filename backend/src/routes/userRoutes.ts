import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { registerUser, loginUser } from "../controllers/usersController";

export async function userRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
  // User routes
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request.body as Login);
    const result = await loginUser(user.NMecanografico, user.password);
    reply.send(result);
  });

  app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request.body as Register);
    console.log(user);
    const result = await registerUser(user.NMecanografico, user.email, user.password, user.licenciatura);
    reply.send(result);
  });
}