import { createVuetify } from "vuetify"

import "@mdi/font/css/materialdesignicons.css"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify: any = createVuetify({
    components,
    directives,
  })
  nuxtApp.vueApp.use(vuetify)
})
