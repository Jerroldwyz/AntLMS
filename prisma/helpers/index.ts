import {
  PrismaClient,
  users,
  courses,
  tags,
  courses_tags,
  topics,
  content,
  quiz_progress,
  quizzes,
  questions,
  choices,
  enrollments,
  progress,
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
  let quiz_progress: quiz_progress[] = []
  const choices: choices[] = []

  for (let i = 0; i < amount; i++) {
    users.push(createUser())
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
    quiz_progress.push(createQuizscore(enrollments, quizzes, users))
    quiz_progress = _.unique(quiz_progress, (x) => `${x.quiz_id}${x.user_id}`)
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
  await prisma.quiz_progress.createMany({
    data: quiz_progress,
  })
  await prisma.choices.createMany({
    data: choices,
  })

  cleanupTempDir()
}
