// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        'nuxt-icon'
    ],
    css: ['~/assets/scss/main.scss']
})
