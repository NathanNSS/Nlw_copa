import { FastifyInstance } from "fastify";
import { z } from "zod";

import { authenticate } from "../plugins/authenticate";
import { prisma } from "../prisma";

export async function authRoutes(fastify: FastifyInstance) {

    fastify.get("/me", {onRequest:[authenticate]},async (req, res) =>{

        return {user: req.user}
    })

    fastify.post("/users", async (req, res) => {
        const userTokenSchema = z.object({
            access_token: z.string()
        });

        const { access_token } = userTokenSchema.parse(req.body);

        const resApiGoogle = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const userData = await resApiGoogle.json()

        const userInfoSchema = z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            picture: z.string().url(),
        })

        const userInfo = userInfoSchema.parse(userData);

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                }
            })
        }

        const token = fastify.jwt.sign({
            name:user.name,
            avatarUrl: user.avatarUrl
        },{sub:user.id, expiresIn:"7d"})

        res.status(200).send({token: token})
    })
}