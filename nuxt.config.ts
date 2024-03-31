// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
     head: {
       charset: 'utf-8',
       viewport: 'width=device-width, initial-scale=1',
       htmlAttrs:{
         lang:'en'
       }
     }
   },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss",
    '@nuxt/image',
  ],
  nitro: {
    experimental: {
      database: true,
    },
  },
  routeRules: {
    "/": {
      ssr: false,
    },
  },
});
