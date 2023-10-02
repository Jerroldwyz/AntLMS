import {
  PrismaClient,
  users,
  courses,
  tags,
  courses_tags,
  topics,
  content,
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
import { createTopic, createMultipleTopics } from "./createTopic"
import { createContent, createMultipleContent } from "./createContent"
import { createQuiz } from "./createQuiz"
import { createQuestion, createMultipleQuestions } from "./createQuestion"
import { createChoice, createMultipleChoices } from "./createChoice"
import { createEnrollment } from "./createEnrollment"
import { createProgress } from "./createProgress"
import { createAdminRoleAttachment } from "./createAdminRoleAttachment"

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
  let topics: topics[] = []
  let enrollments: enrollments[] = []
  let contents: content[] = []
  let quizzes: quizzes[] = []
  let questions: questions[] = []
  let progress: progress[] = []
  let choices: choices[] = []
  let roles: roles[] = []
  let permissions: permissions[] = []
  let admin_role_attachments: admin_role_attachments[] = []
  let role_permissions_attachments: role_permissions_attachments[] = []

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
  }
  users
    .filter((user) => user.is_admin)
    .forEach((admin) =>
      admin_role_attachments.push(createAdminRoleAttachment(roles, admin)),
    )
  // Needs to occur after random role attachment bindings as these need to be specific
  admins.forEach((admin) => users.push(admin))

  users = _.unique(users, (x) => `${x.uid}${x.email}`)
  roles = _.unique(roles, (x) => x.id)
  permissions = _.unique(permissions, (x) => x.id)
  admin_role_attachments = _.unique(admin_role_attachments, (x) => x.user_id)
  role_permissions_attachments = _.unique(
    role_permissions_attachments,
    (x) => x.id,
  )

  for (let i = 0; i < amount; i++) {
    coursePromises.push(createCoursePromise(users))
    tags.push(createTag())
  }
  courses = await Promise.all(coursePromises)
  courses = _.unique(courses, (x) => x.id)
  tags = _.unique(tags, (x) => x.name)

  for (let i = 0; i < amount; i++) {
    courses_tags.push(createCoursetag(courses, tags))
  }
  courses.forEach((course: any) => {
    createMultipleTopics(course).forEach((topic) => topics.push(topic))
  })
  users.forEach((user) => {
    enrollments.push(createEnrollment(user, courses))
  })

  courses_tags = _.unique(courses_tags, (x) => `${x.course_id}${x.tag_id}`)
  topics = _.unique(topics, (x) => `${x.course_id}${x.id}`)
  enrollments = _.unique(enrollments, (x) => `${x.course_id}${x.user_id}`)

  topics.forEach((topic) => {
    createMultipleContent(topic).forEach((content) => contents.push(content))
    quizzes.push(createQuiz(topic))
  })

  contents = _.unique(contents, (x) => x.id)
  quizzes = _.unique(quizzes, (x) => x.id)

  for (let i = 0; i < amount; i++) {
    // TODO
    progress.push(createProgress(users, enrollments, contents))
  }
  quizzes.forEach((quiz) => {
    createMultipleQuestions(quiz).forEach((question) =>
      questions.push(question),
    )
  })
  progress = _.unique(progress, (x) => x.id)
  questions = _.unique(questions, (x) => x.id)

  questions.forEach((question) => {
    createMultipleChoices(question).forEach((choice) => choices.push(choice))
  })
  // choices.push(createChoice(questions))
  choices = _.unique(choices, (x) => x.id)

  console.log(`Generating ${users.length} Users...`)
  await prisma.users.createMany({
    data: users.map((user) => {
      return {
        ...user,
        contact_details: JSON.stringify(user.contact_details),
      }
    }),
  })
  console.log(`Generating ${roles.length} Roles...`)
  await prisma.roles.createMany({
    data: roles,
  })
  console.log(`Generating ${permissions.length} Permissions...`)
  await prisma.permissions.createMany({
    data: permissions,
  })
  console.log(
    `Generating ${role_permissions_attachments.length} Role attachments...`,
  )
  await prisma.role_permissions_attachments.createMany({
    data: role_permissions_attachments,
  })
  console.log(
    `Generating ${admin_role_attachments.length} admin role attachments...`,
  )
  await prisma.admin_role_attachments.createMany({
    data: admin_role_attachments,
  })
  console.log(`Generating ${courses.length} courses...`)
  await prisma.courses.createMany({
    data: courses,
  })
  console.log(`Generating ${tags.length} tags...`)
  await prisma.tags.createMany({
    data: tags,
  })
  console.log(`Generating ${courses_tags.length} course tags...`)
  await prisma.courses_tags.createMany({
    data: courses_tags,
  })
  console.log(`Generating ${topics.length} topics...`)
  await prisma.topics.createMany({
    data: topics,
  })
  console.log(`Generating ${enrollments.length} enrollments...`)
  await prisma.enrollments.createMany({
    data: enrollments,
  })
  console.log(`Generating ${contents.length} contents...`)
  await prisma.content.createMany({
    data: contents,
  })
  console.log(`Generating ${quizzes.length} quizzes...`)
  await prisma.quizzes.createMany({
    data: quizzes,
  })
  console.log(`Generating ${progress.length} progress...`)
  await prisma.progress.createMany({
    data: progress,
  })
  console.log(`Generating ${questions.length} questions...`)
  await prisma.questions.createMany({
    data: questions,
  })
  console.log(`Generating ${choices.length} choices...`)
  await prisma.choices.createMany({
    data: choices,
  })

  cleanupTempDir()
}
