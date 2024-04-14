// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dayjs/locale/en'

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@vue-email/nuxt',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@nuxt/ui',
        'dayjs-nuxt',
        '@nuxtjs/tailwindcss',
        '@sidebase/nuxt-auth',
        ['nuxt-mail', {
            message: {
                to: 'lukasz.fujarski@gmail.com',
            },
            smtp: {
                host: "smtp.mailgun.org",
                port: 587,
                auth: {
                    user: "postmaster@sandbox3d5f52a7c94d4b3c83ade5b6124bba07.mailgun.org",
                    pass: "6f1459e3d58612c6f4d9140b41a2cae1-4b670513-4b614ea2"
                }
            },
        }],
    ],
    i18n: {
        vueI18n: './i18n.config.ts'
    },
    css: ['~/assets/scss/main.scss'],
    auth: {
        baseURL: 'http://localhost:3000/user/auth'
    },
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    dayjs: {
        locales: ['en'],
        plugins: ['timezone'],
        defaultLocale: 'en',
        defaultTimezone: 'Europe/Warsaw',
    },
    vueEmail: {
        baseUrl: 'https://be-crafty.com',
        autoImport: true,
    }
})
