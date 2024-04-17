import redirectSSL from 'redirect-ssl'

export default defineEventHandler((event) => {
    const protocol = event.node.req.headers['x-forwarded-proto']; // http || https
    const env = process.env.NODE_ENV; // development || production

    if (protocol === 'http' && env === 'production') {
        return redirectSSL(event.node.req, event.node.res)
    }
})