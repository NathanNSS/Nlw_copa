import Fastify from 'fastify';
import cors from '@fastify/cors'
import { prisma } from './prisma';

const port = 3333 

async function start(){
    const fastify = Fastify({
        logger: true,        
    })
    
    await fastify.register(cors,{
        origin:true
    })

    fastify.get('/pools/count', async ()=>{
        return prisma.pool.count()
    })

    await fastify.listen({port: port/*, host: "0.0.0.0"*/})
}

start()