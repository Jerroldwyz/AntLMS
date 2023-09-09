import { createVuetify } from "vuetify"

import "@mdi/font/css/materialdesignicons.css"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const myTheme = {
  dark: false,
  colors: {
    main: "#EEEEEE",
    primary: "#224466",
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify: any = createVuetify({
    theme: {
      defaultTheme: "myTheme",
      themes: {
        myTheme,
      },
    },
    components,
    directives,
  })
  nuxtApp.vueApp.use(vuetify)
})
