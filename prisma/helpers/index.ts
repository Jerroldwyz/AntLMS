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
} from ".prisma/client"
import { createTempDir, cleanupTempDir } from "./fileHelpers"
import { createUser } from "./createUser"
import { createCourse } from "./createCourse"
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

  const users: users[] = []
  const coursePromises: Promise<courses>[] = []
  let courses: courses[] = []
  const tags: tags[] = []
  const courses_tags: courses_tags[] = []
  const topics: topics[] = []
  const content: content[] = []
  const quizzes: quizzes[] = []
  const questions: questions[] = []
  const choices: choices[] = []
  const enrollments: enrollments[] = []
  const progress: progress[] = []
  const quiz_score: quiz_score[] = []

  for (let i = 0; i < amount; i++) {
    users.push(createUser())
  }
  for (let i = 0; i < amount; i++) {
    coursePromises.push(createCourse(users))
    tags.push(createTag())
  }
  courses = await Promise.all(coursePromises)

  for (let i = 0; i < amount; i++) {
    courses_tags.push(createCoursetag(courses, tags))
    topics.push(createTopic(courses))
    enrollments.push(createEnrollment(users, courses))
  }
  for (let i = 0; i < amount; i++) {
    content.push(createContent(topics))
    quizzes.push(createQuiz(topics))
  }
  for (let i = 0; i < amount; i++) {
    progress.push(createProgress(users, enrollments, content))
    questions.push(createQuestion(quizzes))
    quiz_score.push(createQuizscore(enrollments, quizzes, users))
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
    skipDuplicates: true,
  })

  await prisma.courses.createMany({
    data: courses,
    skipDuplicates: true,
  })

  await prisma.tags.createMany({
    data: tags,
    skipDuplicates: true,
  })
  await prisma.courses_tags.createMany({
    data: courses_tags,
    skipDuplicates: true,
  })
  await prisma.topics.createMany({
    data: topics,
    skipDuplicates: true,
  })
  await prisma.content.createMany({
    data: content,
    skipDuplicates: true,
  })
  await prisma.quizzes.createMany({
    data: quizzes,
    skipDuplicates: true,
  })
  await prisma.questions.createMany({
    data: questions,
    skipDuplicates: true,
  })
  await prisma.choices.createMany({
    data: choices,
    skipDuplicates: true,
  })
  await prisma.enrollments.createMany({
    data: enrollments,
    skipDuplicates: true,
  })
  await prisma.progress.createMany({
    data: progress,
    skipDuplicates: true,
  })
  await prisma.quiz_score.createMany({
    data: quiz_score,
    skipDuplicates: true,
  })

  cleanupTempDir()
}
