import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";
import { prisma } from "../prisma";

export async function gameRoutes(fastify: FastifyInstance) {

    fastify.get("/pools/:id/games", { onRequest: [authenticate] }, async (req, res) => {
        const idPoolSchema = z.object({
            id: z.string()
        })

        const { id } = idPoolSchema.parse(req.params)

          let games = await prisma.game.findMany({
            orderBy:{
                date:"desc"
            },

            include:{
                guess:{
                    where:{
                        participant:{
                            userId: req.user.sub,
                            poolId: id
                        }
                    }
                }
            }
        })
        
        return res.status(200).send({
            games: games.map(game => {
                return {
                    ...game,
                    guess: game.guess.length > 0 ? game.guess[0] : null,
                }
            })
        })
    })
}