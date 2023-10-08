import { questionsTransformer } from "./questions"

export const quizTransformer = (quiz: any) => {
  return {
    id: quiz.id,
    topicPosition: quiz.topic_position,
    title: quiz.title,
    topicId: quiz.topic_id,
    threshold: quiz.threshold,
    questions: quiz.questions ? quiz.questions.map(questionsTransformer) : [],
  }
}
