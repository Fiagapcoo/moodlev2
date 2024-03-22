import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";

import { registerUser,loginUser } from "../controllers/usersController";
import {getLicenciaturas, addLicenciatura} from "../controllers/licenciaturaController";


export async function routes(app: FastifyInstance, options: FastifyPluginOptions) {

    //user routes
    app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const user = (request.body as any).user;
        const result = await loginUser(user.NMecanografico, user.password);
        reply.send(result);
    });

    app.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
        const user = (request.body as any).user;
        console.log(user);
        //const result = await registerUser(user.NMecanografico, user.email, user.password, user.licenciatura);
        //reply.send(result);
    });


    app.get('/getlicenciaturas', async (request: FastifyRequest, reply: FastifyReply) => {
        const licenciaturas = await getLicenciaturas();
        reply.send(licenciaturas);
    });

    app.post('/addlicenciaturas', async (request: FastifyRequest, reply: FastifyReply) => {
        const licenciatura = (request.body as any).licenciatura;
        const result = await addLicenciatura(licenciatura);
        reply.send(result);
    });
}