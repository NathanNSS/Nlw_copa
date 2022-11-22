import { FastifyInstance } from "fastify";
import { z } from "zod";
import { randomCode } from "../../utils";
import { authenticate } from "../plugins/authenticate";
import { prisma } from "../prisma";

export async function poolRoutes(fastify: FastifyInstance) {
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count()
        return { count }
    })

    fastify.post('/pools', async (req, res) => {
        const bodyReq = z.object({
            title: z.string()
        });

        const { title } = bodyReq.parse(req.body)
        const code = randomCode(6).toUpperCase()

        try {
            await req.jwtVerify()

            await prisma.pool.create({
                data: {
                    title: title,
                    code: code,
                    ownerId: req.user.sub,

                    participants: {
                        create: {
                            userId: req.user.sub
                        }
                    }
                }
            })

        } catch (error) {
            await prisma.pool.create({
                data: {
                    title: title,
                    code: code
                }
            })
        }

        return res.status(201).send({ code })
    })

    fastify.post("/pools/join", { onRequest: [authenticate] }, async (req, res) => {
        const codeJoinScheme = z.object({
            code: z.string()
        })

        const { code } = codeJoinScheme.parse(req.body)

        const pool = await prisma.pool.findUnique({
            where: {
                code: code
            },
            include: {
                participants: {
                    where: {
                        userId: req.user.sub
                    }
                }
            }
        });

        if (!pool) {
            return res.status(400).send({
                message: "Pool Not Found"
            })
        }

        if (pool.participants.length > 0) {
            return res.status(400).send({
                message: "You Already Joined this Pool!"
            })
        }

        if (!pool.ownerId) {
            await prisma.pool.update({
                where: {
                    code: code
                },
                data: {
                    ownerId: req.user.sub
                }
            })
        }

        await prisma.participant.create({
            data: {
                poolId: pool.id,
                userId: req.user.sub,
            }
        })

        return res.status(201).send("Ok")
    })

    fastify.get('/pools', { onRequest: [authenticate] }, async (req, res) => {
        const pools = await prisma.pool.findMany({
            where: {
                participants: {
                    some: {
                        userId: req.user.sub,
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return { pools }
    })

    fastify.get('/pools/:id', { onRequest: [authenticate] }, async (req, res) => {
        const idPoolSchema = z.object({
            id: z.string()
        })

        const { id } = idPoolSchema.parse(req.params)


        const pool = await prisma.pool.findUnique({
            where: {
                id
            },
            include: {
                _count: {
                    select: {
                        participants: true,
                    }
                },
                participants: {
                    select: {
                        id: true,

                        user: {
                            select: {
                                avatarUrl: true,
                            }
                        }
                    },
                    take: 4,
                },
                owner: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return { pool }
    })

}