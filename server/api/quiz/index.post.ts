import { createQuiz } from "~~/server/db/quiz";
import { quizTransformer } from "~~/server/transformers/quiz";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prismaData = {
        topic_id: parseInt(body.topicId as string),
        title: body.title as string,
        topic_position: parseInt(body.topicPosition as string)
    }

    const quiz = await createQuiz(prismaData);

    return quizTransformer(quiz);
})