import {
  permissions,
  role_permissions_attachments,
  roles,
} from "@prisma/client"
import { faker } from "./faker"

export const createRolePermissionAttachment = (
  roles: roles[],
  permissions: permissions[],
): role_permissions_attachments => {
  return {
    id: faker.number.int(2147483647),
    permission_id:
      permissions[Math.floor(Math.random() * permissions.length)].id,
    role_id: roles[Math.floor(Math.random() * roles.length)].id,
  }
}
