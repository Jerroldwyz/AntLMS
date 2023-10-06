import { createVuetify } from "vuetify"

import "@mdi/font/css/materialdesignicons.css"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const myTheme = {
  dark: false,
  colors: {
    background: "#e3e3e3",
    surface: "#FFFFFF",
    primary: "#6200EE",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
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
