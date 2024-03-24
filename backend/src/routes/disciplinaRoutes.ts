import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import{getDisciplinas, addDisciplina, getDisciplinasFromLicenciatura} from "../controllers/disciplinasController";

export async function disciplinaRoutes(app: FastifyInstance, options: FastifyPluginOptions) {
    app.get('/getdisciplinas', async (request: FastifyRequest, reply: FastifyReply) => {
        const disciplinas = await getDisciplinas();
        reply.send(disciplinas);
    });
    
    app.post('/adddisciplinas', async (request: FastifyRequest, reply: FastifyReply) => {
        const disciplina = (request.body as Disciplina);
        const result = await addDisciplina(disciplina.NomeDisciplina, disciplina.Docentes, disciplina.Licenciatura);
        reply.send(result);
    });

    app.get('/getdisciplinafromlicenciatura', async (request: FastifyRequest<{ Querystring: { licenciatura: number } }>, reply: FastifyReply) => {
        const licenciatura = request.query.licenciatura;
        const disciplinas = await getDisciplinasFromLicenciatura(licenciatura);
        reply.send(disciplinas);
      });
}