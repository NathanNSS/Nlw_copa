import { PrismaClient } from "@prisma/client"
import { randomCode } from "../utils";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data:{
            name:"Cleiton Campos",
            email:"cleitoncp@gmail.com",
            avatarUrl:"http://github.com/nathannss.png",
        }
    });

    const pool = await prisma.pool.create({
        data:{
            title:"Example Pool",
            code: randomCode(6),
            ownerId:user.id,

            participants:{
                create:{
                    userId:user.id
                }
            }
        }
    });

    await prisma.game.create({
        data:{
            date:"2022-11-20T12:00:00.741Z",
            firstTeamCountryCode:"BR",
            secondTeamCountryCode:"AR",
        }
    })
    
    await prisma.game.create({
        data:{
            date:"2022-11-21T14:00:00.741Z",
            firstTeamCountryCode:"BR",
            secondTeamCountryCode:"DE",

            guess:{
                create:{
                    firstTeamPoints:2,
                    secondTeamPoints:1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main();