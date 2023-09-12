import { prisma } from "."

export const getCourseById = (course_id: number) => {
  return prisma.courses.findUnique({
    where: {
      id: course_id,
    },
    select: {
      title: true,
      thumbnail: true,
      creator: {
        select: {
          name: true,
        },
      },
      topics: {
        select: {
          title: true,
          content: {
            select: {
              id: true,
              title: true,
              type: true,
              topic_position: true,
              content: true,
              progress: {
                select: {
                  user_id: true,
                },
              },
            },
          },
          quizzes: {
            select: {
              id: true,
              title: true,
              topic_position: true,
              questions: {
                select: {
                  id: true,
                  question_text: true,
                  explanation: true,
                  choices: {
                    select: {
                      id: true,
                      choice_text: true,
                    },
                  },
                },
              },
              quiz_score: true,
            },
          },
        },
      },
      course_tags: {
        select: {
          tag: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
}

export const getCourses = () => {
  return prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      enabled: true,
      thumbnail: true,
      creator: {
        select: {
          name: true,
        },
      },
    },
  })
}
