import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { getAssignments, addAssignment, getAssignmentsFromDisciplina } from "../controllers/assignmentsController";

export async function assignmentsRoutes(app: FastifyInstance, options: FastifyPluginOptions) {

    app.get('/getassignments', async (request: FastifyRequest, reply: FastifyReply) => {
        const assignments = await getAssignments();
        reply.send(assignments);
    });
    
    app.post('/addassignments', async (request: FastifyRequest, reply: FastifyReply) => {
        const assignment = (request.body as Assignment);
        const result = await addAssignment(assignment.Nome_assignment, assignment.Disciplina, assignment.DueDate);
        reply.send(result);
    });

    app.get('/getassignmentsfromdisciplina', async (request: FastifyRequest<{ Querystring: { disciplina: number } }>, reply: FastifyReply) => {
        const disciplina = request.query.disciplina;
        const assignments = await getAssignmentsFromDisciplina(disciplina);
        reply.send(assignments);
      });
}