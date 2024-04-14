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
                    user: "postmaster@sandbox9e12515110d94261aa7c3d9133c2071d.mailgun.org",
                    pass: "f341d05db0e78dbacb0a5752b5ed1935-6d1c649a-36c45324"
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
