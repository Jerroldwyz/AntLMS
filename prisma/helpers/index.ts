import {
  PrismaClient,
  users,
  courses,
  tags,
  courses_tags,
  topics,
  content,
  quiz_score,
  quizzes,
  questions,
  choices,
  enrollments,
  progress,
  permissions,
  roles,
  role_permissions_attachments,
  admin_role_attachments,
} from ".prisma/client"
import * as _ from "radash"
import { createTempDir, cleanupTempDir } from "./fileHelpers"
import { createUser } from "./createUser"
import { createCoursePromise } from "./createCourse"
import { createTag } from "./createTag"
import { createCoursetag } from "./createCoursetag"
import { createTopic } from "./createTopic"
import { createContent } from "./createContent"
import { createQuiz } from "./createQuiz"
import { createQuestion } from "./createQuestion"
import { createChoice } from "./createChoice"
import { createEnrollment } from "./createEnrollment"
import { createProgress } from "./createProgress"
import { createQuizscore } from "./createQuizscore"

import { faker } from "./faker"

const admins: users[] = [
  {
    uid: faker.string.uuid(),
    name: "admin",
    email: faker.internet.email(),
    contact_details: {},
    thumbnail: null,
    is_admin: true,
    enabled: true,
  },
  {
    uid: faker.string.uuid(),
    name: "manager",
    email: faker.internet.email(),
    contact_details: {},
    thumbnail: null,
    is_admin: true,
    enabled: true,
  },
  {
    uid: faker.string.uuid(),
    name: "staff",
    email: faker.internet.email(),
    contact_details: {},
    thumbnail: null,
    is_admin: true,
    enabled: true,
  },
]

const permissions_list: permissions[] = [
  {
    id: faker.number.int(2147483647),
    name: "editUser",
  },
  {
    id: faker.number.int(2147483647),
    name: "disableUser",
  },
  {
    id: faker.number.int(2147483647),
    name: "deleteUser",
  },
  {
    id: faker.number.int(2147483647),
    name: "createSiteAdmin",
  },
  {
    id: faker.number.int(2147483647),
    name: "editSiteAdmin",
  },
  {
    id: faker.number.int(2147483647),
    name: "disableSiteAdmin",
  },
  {
    id: faker.number.int(2147483647),
    name: "deleteSiteAdmin",
  },
  {
    id: faker.number.int(2147483647),
    name: "disableCourse",
  },
  {
    id: faker.number.int(2147483647),
    name: "deleteCourse",
  },
  {
    id: faker.number.int(2147483647),
    name: "createRoles",
  },
  {
    id: faker.number.int(2147483647),
    name: "editRoles",
  },
  {
    id: faker.number.int(2147483647),
    name: "deleteRoles",
  },
]

const roles_list: roles[] = [
  {
    id: faker.number.int(2147483647),
    name: "admin",
  },
  {
    id: faker.number.int(2147483647),
    name: "manager",
  },
  {
    id: faker.number.int(2147483647),
    name: "staff",
  },
]

const role_permissions_attachments_list: role_permissions_attachments[] = [
  ...permissions_list.map((perm) => {
    return {
      id: faker.number.int(2147483647),
      permission_id: perm.id,
      role_id: roles_list[0].id,
    }
  }),
  ...permissions_list
    .filter(
      (perm) =>
        perm.name.includes("edit") ||
        perm.name.includes("disable") ||
        perm.name.includes("create"),
    )
    .map((perm) => {
      return {
        id: faker.number.int(2147483647),
        permission_id: perm.id,
        role_id: roles_list[1].id,
      }
    }),
  ...permissions_list
    .filter(
      (perm) => perm.name.includes("edit") || perm.name.includes("create"),
    )
    .map((perm) => {
      return {
        id: faker.number.int(2147483647),
        permission_id: perm.id,
        role_id: roles_list[2].id,
      }
    }),
]

const admin_role_attachments_list: admin_role_attachments[] = [
  {
    id: faker.number.int(2147483647),
    user_id: admins[0].uid,
    role_id: roles_list[0].id,
  },
  {
    id: faker.number.int(2147483647),
    user_id: admins[1].uid,
    role_id: roles_list[1].id,
  },
  {
    id: faker.number.int(2147483647),
    user_id: admins[2].uid,
    role_id: roles_list[2].id,
  },
]

export const generateData = async (prisma: PrismaClient, amount: number) => {
  createTempDir()

  let users: users[] = []
  const coursePromises: Promise<courses>[] = []
  let courses: courses[] = []
  let tags: tags[] = []
  let courses_tags: courses_tags[] = []
  const topics: topics[] = []
  let enrollments: enrollments[] = []
  const content: content[] = []
  const quizzes: quizzes[] = []
  const questions: questions[] = []
  const progress: progress[] = []
  let quiz_score: quiz_score[] = []
  const choices: choices[] = []
  const roles: roles[] = []
  const permissions: permissions[] = []
  const admin_role_attachments: admin_role_attachments[] = []
  const role_permissions_attachments: role_permissions_attachments[] = []

  admins.forEach((admin) => users.push(admin))
  roles_list.forEach((role) => roles.push(role))
  permissions_list.forEach((permission) => permissions.push(permission))
  admin_role_attachments_list.forEach((admin_role_attachment) =>
    admin_role_attachments.push(admin_role_attachment),
  )
  role_permissions_attachments_list.forEach((role_permissions_attachment) =>
    role_permissions_attachments.push(role_permissions_attachment),
  )

  for (let i = 0; i < amount; i++) {
    users.push(await createUser())
    users = _.unique(users, (x) => x.email)
  }
  for (let i = 0; i < amount; i++) {
    coursePromises.push(createCoursePromise(users))
    tags.push(createTag())
    tags = _.unique(tags, (x) => x.name)
  }
  courses = await Promise.all(coursePromises)

  for (let i = 0; i < amount; i++) {
    courses_tags.push(createCoursetag(courses, tags))
    courses_tags = _.unique(courses_tags, (x) => `${x.course_id}${x.tag_id}`)
    topics.push(createTopic(courses))
    enrollments.push(createEnrollment(users, courses))
    enrollments = _.unique(enrollments, (x) => `${x.course_id}${x.user_id}`)
  }
  for (let i = 0; i < amount; i++) {
    content.push(createContent(topics))
    quizzes.push(createQuiz(topics))
  }
  for (let i = 0; i < amount; i++) {
    progress.push(createProgress(users, enrollments, content))
    questions.push(createQuestion(quizzes))
    quiz_score.push(createQuizscore(enrollments, quizzes, users))
    quiz_score = _.unique(quiz_score, (x) => `${x.quiz_id}${x.user_id}`)
  }
  for (let i = 0; i < amount; i++) {
    choices.push(createChoice(questions))
  }

  await prisma.users.createMany({
    data: users.map((user) => {
      return {
        ...user,
        contact_details: JSON.stringify(user.contact_details),
      }
    }),
  })
  await prisma.roles.createMany({
    data: roles,
  })
  await prisma.permissions.createMany({
    data: permissions,
  })
  await prisma.role_permissions_attachments.createMany({
    data: role_permissions_attachments,
  })
  await prisma.admin_role_attachments.createMany({
    data: admin_role_attachments,
  })
  await prisma.courses.createMany({
    data: courses,
  })
  await prisma.tags.createMany({
    data: tags,
  })
  await prisma.courses_tags.createMany({
    data: courses_tags,
  })
  await prisma.topics.createMany({
    data: topics,
  })
  await prisma.enrollments.createMany({
    data: enrollments,
  })
  await prisma.content.createMany({
    data: content,
  })
  await prisma.quizzes.createMany({
    data: quizzes,
  })
  await prisma.progress.createMany({
    data: progress,
  })
  await prisma.questions.createMany({
    data: questions,
  })
  await prisma.quiz_score.createMany({
    data: quiz_score,
  })
  await prisma.choices.createMany({
    data: choices,
  })

  cleanupTempDir()
}
