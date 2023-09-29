import { admin_role_attachments, roles, users } from "@prisma/client"
import { faker } from "./faker"

export const createAdminRoleAttachment = (
  roles: roles[],
  users: users[],
): admin_role_attachments => {
  return {
    id: faker.number.int(2147483647),
    user_id: users[Math.floor(Math.random() * users.length)].uid,
    role_id: roles[Math.floor(Math.random() * roles.length)].id,
  }
}
