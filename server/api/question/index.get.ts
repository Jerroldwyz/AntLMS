import { getQuestionById } from "~~/server/db/question"
import { questionsTransformer } from "~~/server/transformers/questions"

export default defineEventHandler(async (event) => {
  const query = await getQuery(event)

  const question = await getQuestionById(parseInt(query.questionId as string))

  return questionsTransformer(question)
})
