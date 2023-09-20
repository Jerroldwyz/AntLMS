// TODO: Is this unfinished? allowedRoutes is never used
// export const getProtectedRoutes = (allowedRoutes: string[]) => {
export const getProtectedRoutes = () => {
  const router = useRouter()
  const allRoutes = router.getRoutes()
  const topLevelPaths = getTopLevelPaths(allRoutes.map((r) => r.path))
  return topLevelPaths
}

const getTopLevelPaths = (routes: string[]) => {
  return [
    ...new Set(
      routes.map((route) => {
        const parts = route.split("/")
        return parts[1] || ""
      }),
    ),
  ]
}
