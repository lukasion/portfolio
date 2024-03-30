// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dayjs/locale/en'

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@nuxt/ui',
        'dayjs-nuxt',
        '@sidebase/nuxt-auth',
        ['nuxt-mail', {
            message: {
                to: 'lukasz.fujarski@gmail.com',
            },
            smtp: {
                host: "smtp.example.com",
                port: 587,
            },
        }],
    ],
    i18n: {
        vueI18n: './i18n.config.ts'
    },
    css: ['~/assets/scss/main.scss'],
    auth: {
        baseURL: 'https://be-crafty.com/user/auth'
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
})
