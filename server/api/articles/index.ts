import {PrismaClient} from "@prisma/client";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<any> => {
    const prisma = new PrismaClient()
    const query = getQuery(event)

    const pagination = {
        skip: query.page ? (parseInt(<string>query.page) - 1) * 4 : 0,
        take: query.limit ? parseInt(<string>query.limit) : 4
    }

    return prisma.post.findMany({
        ...pagination,
        orderBy: {
            datetime: 'desc'
        },
    });
})