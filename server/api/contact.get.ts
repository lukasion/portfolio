import {useCompiler} from "#vue-email";
import {EventHandlerRequest, H3Event} from "h3";

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>): Promise<any> => {
    const query = getQuery(event)

    try {
        const template = await useCompiler('Contact.vue', {
            props: {
                name: query.name,
                email: query.email,
                message: query.message,
                phone: query.phone,
            }
        })
        if (!template) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
            })
        }

        return template
    } catch (error) {
        console.error(error)

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        })
    }
})