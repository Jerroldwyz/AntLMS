export default defineNuxtRouteMiddleware((to, from) => {
  if (appConfig() === "development") {
  } else {
  }
})
