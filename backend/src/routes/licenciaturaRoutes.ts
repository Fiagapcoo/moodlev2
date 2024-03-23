import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { getLicenciaturas, addLicenciatura } from "../controllers/licenciaturaController";

export async function licenciaturaRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
  // Licenciatura routes
  app.get('/getlicenciaturas', async (request: FastifyRequest, reply: FastifyReply) => {
    const licenciaturas = await getLicenciaturas();
    reply.send(licenciaturas);
  });

  app.post('/addlicenciaturas', async (request: FastifyRequest, reply: FastifyReply) => {
    const licenciatura = (request.body as Licenciatura);
    const result = await addLicenciatura(licenciatura.Nome_licenciatura, licenciatura.Enabled);
    reply.send(result);
  });
}