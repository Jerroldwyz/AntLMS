import { prisma } from "."
import { getQuizzes } from "~/server/utils/db/quiz"
import { getContents } from "~/server/utils/db/content"

export const enrollUser = (user_id: string, course_id: number) => {
  return prisma.enrollments.create({
    data: {
      user_id,
      course_id,
    },
  })
}

export const unenrollUser = (user_id: string, course_id: number) => {
  return prisma.enrollments.deleteMany({
    where: {
      course_id,
      user_id,
    },
  })
}

export const getEnrollment = (user_id: string) => {
  return prisma.enrollments.findMany({
    where: {
      user_id,
    },
    select: {
      id: true,
      course: {
        select: {
          id: true,
          title: true,
          thumbnail: true,
          creator: {
            select: {
              name: true,
            },
          },
        },
      },
      progress: true,
      quiz_progress: true,
    },
  })
}

export const getEnrollmentProgress = async (
  userUid: string,
  courseId: number,
) => {
  const enrollments = await getEnrollment(userUid)
  if (enrollments !== null) {
    const courses = enrollments.filter(
      (enrollment) => enrollment.course.id === courseId,
    )
    if (courses.length > 0) {
      const course = courses[0].course
      const topics = await getTopics(course.id)

      const contentAndQuizIds = []

      await Promise.all(
        topics.map(async (topic) => {
          const contents = await getContents(topic.id)
          const quizzes = await getQuizzes(topic.id)
          contents.forEach((content) => {
            contentAndQuizIds.push(content.id)
          })
          quizzes.forEach((quiz) => {
            contentAndQuizIds.push(quiz.id)
          })
        }),
      )

      const completedContentAndQuizIds = []
      courses[0].quiz_progress.forEach((quiz_progresses: any) => {
        completedContentAndQuizIds.push(quiz_progresses.id)
      })
      courses[0].progress.forEach((progresses: any) => {
        completedContentAndQuizIds.push(progresses.id)
      })
      return (
        (completedContentAndQuizIds.length / contentAndQuizIds.length) * 100
      )
    }
  } else {
    return 0
  }
}
