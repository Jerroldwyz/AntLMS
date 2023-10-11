export const createRole = async (
  roleName: string,
  permissionIds: number[] = [],
): Promise<any> => {
  const { data } = await useFetch("/api/admin/roles", {
    method: "post",
    body: {
      name: roleName,
      permission_ids: permissionIds,
    },
  })
  return data
}

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

export const deleteRoleById = async (id: number): Promise<any> => {
  const data = await $fetch(`/api/admin/roles/${id}`, {
    method: "DELETE",
  })
  return data
}

export const getPermissions = async (): Promise<any> => {
  const { data } = await useFetch("/api/admin/permissions", {
    method: "get",
  })
  return data
}

export const getPermissionById = async (id: number) => {
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

export const deleteManagerById = async (uid: string): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users/${uid}`, {
    method: "delete",
  })
  return data
}

export const createManager = async (
  name: string,
  email: string,
  role_id: number = -1,
): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users`, {
    method: "post",
    body: {
      name,
      email,
      role_id,
    },
  })
  return data
}

export const createManagerRoleMapping = async (
  managerUid: string,
  roleId: number,
): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users/${managerUid}/mappings`, {
    method: "post",
    body: {
      roleId,
    },
  })
  return data
}

export const updateManagerRoleMapping = async (
  managerUid: string,
  roleId: number,
): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users/${managerUid}/mappings`, {
    method: "put",
    body: {
      roleId,
    },
  })
  return data
}

export const deleteManagerRoleMapping = async (
  managerUid: string,
  roleId: number,
): Promise<any> => {
  const { data } = await useFetch(`/api/admin/users/${managerUid}/mappings`, {
    method: "delete",
    body: {
      roleId,
    },
  })
  return data
}

export const updateRolePermissionMappings = async (
  roleId: number,
  permission_ids: number[],
): Promise<any> => {
  const { data } = await useFetch(`/api/admin/roles/${roleId}/mappings`, {
    method: "put",
    body: {
      permission_ids,
    },
  })
  return data
}
