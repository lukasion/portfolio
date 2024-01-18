import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()

    return await prisma.post.findFirst({
        where: {
            id: event.context.params.slug
        }
    })
})