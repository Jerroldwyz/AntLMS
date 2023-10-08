import { content, quizzes } from "@prisma/client"
import { prisma } from "."

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
          topics: {
            select: {
              id: true,
              title: true,
              content: {
                select: {
                  id: true,
                },
              },
              quizzes: {
                select: {
                  id: true,
                },
              },
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
    // console.log(enrollments)
    const courses = enrollments.filter(
      (enrollment) => enrollment.course.id === courseId,
    )
    // console.log(courses)
    if (courses.length > 0) {
      const course = courses[0].course

      const contentAndQuizIds = []
      course.topics.forEach((topic: any) => {
        topic.content.forEach((content: content) => {
          contentAndQuizIds.push(content.id)
        })
        topic.quizzes.forEach((quiz: quizzes) => {
          contentAndQuizIds.push(quiz.id)
        })
      })
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

export const getEnrolledCourse = async (user_id: string, course_id: number) => {
  return await prisma.enrollments.findFirst({
    where: {
      user_id,
      course_id,
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
          topics: {
            select: {
              id: true,
              title: true,
              content: {
                select: {
                  id: true,
                  title: true,
                  type: true,
                  topic_position: true,
                  topic_id: true,
                },
              },
              quizzes: {
                select: {
                  id: true,
                  title: true,
                  topic_position: true,
                  topic_id: true,
                },
              },
            },
          },
        },
      },
    },
  })
}
