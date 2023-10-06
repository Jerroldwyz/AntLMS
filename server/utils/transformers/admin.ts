import { ApiRole, ApiManager } from "~~/types"

export const apiRoleTransformer = (data: any): ApiRole => {
  return {
    id: data.id,
    name: data.name,
    permissions: data.role_permission_attachments.map((perm: any) => {
      return {
        id: perm.permission.id,
        name: perm.permission.name,
      }
    }),
  }
}

export const apiManagerTransformer = (data: any): ApiManager => {
  return {
    uid: data.uid,
    name: data.name,
    email: data.email,
    roles: data.admin_role_attachments.map((attachment: any) => {
      const role = attachment.role
      return {
        id: role.id,
        name: role.name,
      }
    }),
  }
}
