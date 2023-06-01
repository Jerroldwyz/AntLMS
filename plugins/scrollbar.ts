// eslint-disable-next-line import/no-named-as-default
import PerfectScrollbar from 'vue3-perfect-scrollbar'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PerfectScrollbar as any)
})
