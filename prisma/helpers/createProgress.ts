import {
  users,
  enrollments,
  progress,
  content,
  courses,
  topics,
} from "@prisma/client"
import { faker } from "./faker"

export const createProgress = (
  users: users[],
  enrollments: enrollments[],
  contents: content[],
  topics: topics[],
): progress => {
  const userUid = users[Math.floor(Math.random() * users.length)].uid
  const enrolledCourses = enrollments.filter(
    (e) => e.user_id === (userUid as unknown as string),
  )
  const enrollment =
    enrolledCourses[Math.floor(Math.random() * enrolledCourses.length)]

  const allContents: content[] = []
  const allTopics = topics.filter((c) => c.course_id === enrollment.course_id)
  for (let j = 0; j < allTopics.length; j++) {
    const availableContents = contents.filter(
      (content) => content.topic_id === allTopics[j].id,
    )
    allContents.push(...availableContents)
  }

  return {
    id: faker.number.int(2147483647),
    user_id: userUid,
    content_id: allContents[Math.floor(Math.random() * allContents.length)].id,
    enrollment_id: enrollment.id,
  }
}
