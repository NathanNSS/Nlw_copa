import Fastify from 'fastify';
import cors from '@fastify/cors'

///Rotas
import { userRoutes } from './routers/user';
import { poolRoutes } from './routers/pool';
import { guessRoutes } from './routers/guess';
import { gameRoutes } from './routers/game';
import { authRoutes } from './routers/auth';
import jwt from '@fastify/jwt';

const port = 3333 

async function start(){
    const fastify = Fastify({
        //logger: true,        
    })
    
    await fastify.register(cors,{
        origin:true
    })
    
    //////////////Rotas//////////////
    await fastify.register(userRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(authRoutes)

    await fastify.register(jwt,{
        secret:String(process.env.SECRET_KEY)
    })
   
    await fastify.listen({port: port, host: "0.0.0.0"})
}

start()
