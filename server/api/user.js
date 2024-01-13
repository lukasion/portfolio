import {PrismaClient} from '@prisma/client'

export default defineEventHandler(async (event, data) => {
    const prisma = new PrismaClient()

    const body = await readBody(event)

    const user = await prisma.user.create({
        data: {
            name: body.email,
            email: body.email,
            password: body.password,
        },
    })
    console.log(user)

    prisma.$disconnect()
})