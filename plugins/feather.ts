import VueFeather from 'vue-feather'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(VueFeather.name, VueFeather)
})
