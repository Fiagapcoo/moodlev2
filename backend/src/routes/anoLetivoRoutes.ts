import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import {getAnosLetivos, addAnoLetivo, getAnoLetivoAtual} from "../controllers/anoLetivoController";

export async function anoLetivoRoutes(app: FastifyInstance, options: FastifyPluginOptions) {

    app.get('/getanosletivos', async (request: FastifyRequest, reply: FastifyReply) => {
        const anosLetivos = await getAnosLetivos();
        reply.send(anosLetivos);
    });
    
    app.get('/getanoletivoatual', async (request: FastifyRequest, reply: FastifyReply) => {
        const anoLetivoAtual = await getAnoLetivoAtual();
        reply.send(anoLetivoAtual);
    });
    
    app.post('/addanoletivo', async (request: FastifyRequest, reply: FastifyReply) => {
        const anoLetivo = (request.body as AnoLetivo);
        const result = await addAnoLetivo(anoLetivo.AnoLetivo);
        reply.send(result);
    });
}