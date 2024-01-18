import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const body = await readBody(event)

    return await prisma.topic.create({
        data: {
            name: body.name,
            datetime: new Date(body.datetime),
        }
    })
})