import Fastify from 'fastify'
import cors from '@fastify/cors'
import {routes} from './routes/routes'
const app = Fastify({logger: false});

const start = async () => {
    await app.register(cors);
    app.register(routes);



    try{
      await app.listen(8000, '0.0.0.0');

    }catch (error){
      app.log.error(error);
      process.exit(1);
    }
};

start();
