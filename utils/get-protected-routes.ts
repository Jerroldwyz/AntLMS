export const getProtectedRoutes = (allowedRoutes: string[]) => {
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
      })
    ),
  ]
}
