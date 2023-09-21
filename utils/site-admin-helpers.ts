export const getRoles = async (): Promise<any> => {
  const { data } = await useFetch("/api/admin/roles", {
    method: "get",
  })
  return data
}

export const getRoleById = async (id: number): Promise<any> => {
  const { data } = await useFetch(`/api/admin/roles/${id}`, {
    method: "get",
  })
  return data
}

export const getPermissions = async (): Promise<any> => {
  const { data } = await useFetch("/api/admin/permissions", {
    method: "get",
  })
  return data
}

export const getPermissionById = async (id: number): Promise<any> => {
  const { data } = await useFetch(`/api/admin/permissions/${id}`, {
    method: "get",
  })
  return data
}

export const getManagers = async (): Promise<any> => {
  const { data } = await useFetch("/api/admin/users", {
    method: "get",
  })
  return data
}

export const getManagerById = async (uid: string): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users/${uid}`, {
    method: "get",
  })
  return data
}
