import Fastify from 'fastify'
import cors from '@fastify/cors'
//routes
import { userRoutes } from './routes/userRoutes';
import { licenciaturaRoutes } from './routes/licenciaturaRoutes';
import { anoLetivoRoutes } from './routes/anoLetivoRoutes';




const app = Fastify({logger: false});

const start = async () => {
    await app.register(cors);
    app.register(licenciaturaRoutes, {prefix: '/licenciatura'});
    app.register(userRoutes, {prefix: '/user'});
    app.register(anoLetivoRoutes, {prefix: '/anoletivo'});



    try{
      await app.listen(8000, '0.0.0.0');

    }catch (error){
      app.log.error(error);
      process.exit(1);
    }
};

start();
