import { questionsTransformer } from "./questions"

export const quizTransformer = (quiz: any) => {
  return {
    title: quiz.title,
    topicId: quiz.topic_id,
    questions: quiz.questions.map(questionsTransformer),
  }
}
