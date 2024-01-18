import {PrismaClient} from "@prisma/client";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<any> => {
    const prisma: PrismaClient = new PrismaClient()
    const params: Record<string, string> | undefined = event.context.params

    if (params?.id) {
        return await prisma.topic.findFirst({
            where: {
                id: parseInt(params.id)
            }
        })
    }
})