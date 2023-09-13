import { choiceTransformer } from "./choices"

export const questionsTransformer = (question: any) => {
  return {
    id: question.id,
    questionText: question.question_text ?? "Empty Field",
    explanation: question.explanation ?? "Empty Field",
    choices: question.choices.map(choiceTransformer),
  }
}
