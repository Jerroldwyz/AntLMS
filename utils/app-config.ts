export const appConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.public.application
}
