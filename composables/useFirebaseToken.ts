// firebase id token observer
export default () => {
  const cookieOptions = useRuntimeConfig().public.firebaseAuthCookie
  return useCookie(`${cookieOptions.name}-token`)
}
