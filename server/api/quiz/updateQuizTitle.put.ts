
import { updateQuizTitle } from "~~/server/db/quiz";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const quiz = await updateQuizTitle(parseInt(body.quizId as string), body.title as string);

    return quiz;
})