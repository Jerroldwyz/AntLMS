import { choiceTransformer } from "./choices"

export const questionsTransformer = (question: any) => {
    return {
        id: question.id,
        questionText: question.question_text,
        explanation: question.explanation ?? "",
        choices: question.choices.map(choiceTransformer),
    }
}