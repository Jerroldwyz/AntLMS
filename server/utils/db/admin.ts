import { apiManagerTransformer } from "../transformers/admin"
import { prisma } from "."
import { ApiRole } from "~~/types"

export const getRoleById = async (roleId: number): Promise<ApiRole> => {
  const role = await prisma.roles.findUnique({
    where: {
      id: roleId,
    },
    select: {
      id: true,
      name: true,
      role_permission_attachments: {
        select: {
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
  return apiRoleTransformer(role)
}

export const getRoles = async (): Promise<ApiRole[]> => {
  const roles = await prisma.roles.findMany({
    select: {
      id: true,
      name: true,
      role_permission_attachments: {
        select: {
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
  return roles.map((role) => apiRoleTransformer(role))
}

export const deleteRoleById = (role_id: number) => {
  return prisma.roles.delete({
    where: {
      id: role_id,
    },
  })
}

export const getPermissionById = (permissionId: number) => {
  return prisma.roles.findUnique({
    where: {
      id: permissionId,
    },
    select: {
      id: true,
      name: true,
    },
  })
}

export const getPermissions = () => {
  return prisma.permissions.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}

export const getManagerById = async (managerId: string) => {
  const manager = await prisma.users.findUnique({
    where: {
      uid: managerId,
      is_admin: true,
    },
    select: {
      uid: true,
      name: true,
      email: true,
      admin_role_attachments: {
        select: {
          role: {
            select: {
              id: true,
              name: true,
              role_permission_attachments: {
                select: {
                  id: true,
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return apiManagerTransformer(manager)
}

export const getManagers = async () => {
  const managers = await prisma.users.findMany({
    where: {
      is_admin: true,
    },
    select: {
      uid: true,
      name: true,
      email: true,
      admin_role_attachments: {
        select: {
          role: {
            select: {
              id: true,
              name: true,
              role_permission_attachments: {
                select: {
                  id: true,
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return managers.map((manager: any) => apiManagerTransformer(manager))
}
