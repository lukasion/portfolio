import {PrismaClient} from "@prisma/client";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<any> => {
    const prisma = new PrismaClient()
    const query = getQuery(event)

    const pagination = {
        skip: query.page ? (parseInt(<string>query.page) - 1) * 4 : 0,
        take: query.limit ? parseInt(<string>query.limit) : 4
    }

    let whereClause = {
        lang: query.lang
    }

    if (query.withoutArticleId) {
        whereClause = {
            ...whereClause,
            id: {
                not: parseInt(<string>query.withoutArticleId)
            }
        }
    }

    if (query.categoryId) {
        whereClause = {
            ...whereClause,
            category_id: parseInt(<string>query.categoryId)
        }
    }

    return prisma.post.findMany({
        ...pagination,
        orderBy: {
            datetime: 'desc'
        },
        include: {
            category: true
        },
        where: whereClause
    });
})