// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devServer: { port: 4000 },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  app: {
    head: {
      title: "SISTEM PATROLI USG",
      // link: [{ rel: "icon", type: "image/x-icon", href: "/images/logo.png" }],
    },
  },

  runtimeConfig: {
    public: {
      // dev
      apiBase: "http://localhost:3000",
      // prod
      // apiBase: "/",
    },
  },

  modules: [
    "@element-plus/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@hebilicious/vue-query-nuxt",
  ],
});
