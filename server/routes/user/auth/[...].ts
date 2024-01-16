import CredentialsProvider from 'next-auth/providers/credentials'
import {NuxtAuthHandler} from '#auth'

export default NuxtAuthHandler({
    secret: 'Rw7JIuIYR9ul6gcw1YOY4',
    providers: [
        CredentialsProvider.default({
            name: '...',
            credentials: {
                email: {label: 'E-mail', type: 'text', placeholder: '(e.g.: admin@admin.test)'},
                password: {label: 'Password', type: 'password', placeholder: '(e.g.: hunter2)'}
            },
            authorize(credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!
                const user = {id: '1', email: 'admin@admin.test', password: 'hunter2'}
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')
                    return null
                }
            }
        })
    ]
})