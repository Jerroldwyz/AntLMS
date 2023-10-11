import { choiceTransformer } from "./choices"

export const questionsTransformer = (question: any) => {
  return {
    id: question.id,
    quizId: question.quiz_id,
    questionText: question.question_text ?? "Empty Field",
    explanation: question.explanation ?? "Empty Field",
    choices: question.choices ? question.choices.map(choiceTransformer) : "",
  }
}
