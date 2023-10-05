import { admin_role_attachments, roles, users } from "@prisma/client"
import { faker } from "./faker"

export const createAdminRoleAttachment = (
  roles: roles[],
  user: users,
): admin_role_attachments => {
  return {
    id: faker.number.int(2147483647),
    user_id: user.uid,
    role_id: roles[Math.floor(Math.random() * roles.length)].id,
  }
}
