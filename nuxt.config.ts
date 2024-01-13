// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    extends: ['@nuxt/ui-pro'],
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        'nuxt-icon',
        '@nuxt/ui',
        'nuxt-auth-sanctum'
    ],
    css: ['~/assets/scss/main.scss'],
    sanctum: {
        baseUrl: 'http://localhost',
        origin: 'http://localhost:3000',
    },
})
