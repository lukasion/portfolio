// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@nuxt/ui',
        '@sidebase/nuxt-auth'
    ],
    css: ['~/assets/scss/main.scss'],
    auth: {
        baseURL: '/user/auth',
    }
})
