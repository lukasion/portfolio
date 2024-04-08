import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'
import {PrismaClient} from "@prisma/client";

export default NuxtAuthHandler({
    secret: 'Rw7JIuIYR9ul6gcw1YOY4',
    providers: [
        CredentialsProvider.default({
            name: '...',
            credentials: {
                email: {label: 'E-mail', type: 'text', placeholder: '(e.g.: admin@admin.test)'},
                password: {label: 'Password', type: 'password', placeholder: '(e.g.: hunter2)'}
            },
            async authorize(credentials: any) {
                const prisma: PrismaClient = new PrismaClient()
                const user = await prisma.user.findFirst(
                    {
                        where: {
                            email: credentials.email,
                            password: credentials.password
                        }
                    }
                )

                if (user) {
                    return user
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
                    return null
                }
            }
        })
    ]
})