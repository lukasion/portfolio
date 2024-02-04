import {PrismaClient} from "@prisma/client";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<any> => {
    const prisma: PrismaClient = new PrismaClient()
    const params: Record<string, string> | undefined = event.context.params

    if (params?.slug) {
        return await prisma.post.findFirst({
            where: {
                friendly_url: params.slug
            }
        })
    }
})