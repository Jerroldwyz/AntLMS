import {
  quiz_progress,
  enrollments,
  quizzes,
  users,
  topics,
} from "@prisma/client"
import { faker } from "./faker"

export const createQuizProgress = (
  enrollments: enrollments[],
  quizzes: quizzes[],
  users: users[],
  topics: topics[],
  existingQuizProgress: quiz_progress[],
): quiz_progress => {
  const userUid = users[Math.floor(Math.random() * users.length)].uid
  const enrolledCourses = enrollments.filter(
    (e) => e.user_id === (userUid as unknown as string),
  )
  const enrollment =
    enrolledCourses[Math.floor(Math.random() * enrolledCourses.length)]

  const allQuizzes: quizzes[] = []
  const allTopics = topics.filter((c) => c.course_id === enrollment.course_id)
  for (let j = 0; j < allTopics.length; j++) {
    const availableQuizzes = quizzes.filter(
      (quiz) => quiz.topic_id === allTopics[j].id,
    )
    allQuizzes.push(...availableQuizzes)
  }

  const quizId = allQuizzes[Math.floor(Math.random() * allQuizzes.length)].id

  // Check if the combination of user_id and quiz_id already exists in the database
  const isUnique = !existingQuizProgress.some(
    (progress) => progress.user_id === userUid && progress.quiz_id === quizId,
  )

  if (!isUnique) {
    // If it's not unique, you can recursively call the function again to generate a new entry.
    return createQuizProgress(
      enrollments,
      quizzes,
      users,
      topics,
      existingQuizProgress,
    )
  }

  return {
    id: faker.number.int(2147483647),
    quiz_id: quizId,
    user_id: userUid,
    enrollment_id: enrollment.id,
  }
}
