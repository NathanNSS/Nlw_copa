import Fastify from 'fastify';
import cors from '@fastify/cors'
import { prisma } from './prisma';
import { z } from "zod";
import { randomCode } from '../utils';

const port = 3333 

async function start(){
    const fastify = Fastify({
        logger: true,        
    })
    
    await fastify.register(cors,{
        origin:true
    })
    //////////////Rotas//////////////
    fastify.get('/pools/count', async ()=>{
        const count = await prisma.pool.count()
        return {count}
    })

    fastify.get('/users/count', async ()=>{
        const count = await prisma.user.count()
        return {count}
    })

    fastify.get('/guesses/count', async ()=>{
        const count = await prisma.guess.count()
        return {count}
    })

    fastify.post('/pools', async (req, res)=>{
        const bodyReq = z.object({
            title: z.string()
        });

        const {title} = bodyReq.parse(req.body)
        const code = randomCode(6).toUpperCase()
        await prisma.pool.create({
            data:{
                title:title,
                code: code
            }
        })

        return res.status(201).send({code})
    })

    await fastify.listen({port: port/*, host: "0.0.0.0"*/})
}

start()