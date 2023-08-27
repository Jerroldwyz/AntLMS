
import { createQuestion } from "~~/server/db/question";
import { questionsTransformer } from "~~/server/transformers/questions";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prismaData = {
        quiz_id: parseInt(body.quizId as string),
        question_text: body.questionText as string,
        explanation: body.explanation as string,
        choices: {
            createMany: {
                data: body.choices.map((choice: any) => {
                    const modifiedChoice: any = {
                        choice_text: choice.choiceText,
                        is_correct: choice.isCorrect,
                    };
                    return modifiedChoice;
                })
            }
        }
    }

    const question = await createQuestion(prismaData);

    return questionsTransformer(question);
})