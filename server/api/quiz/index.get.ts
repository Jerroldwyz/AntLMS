import { getQuizById } from "~~/server/db/quiz";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    const quiz = await getQuizById(parseInt(query.quizId as string));

    return quiz;
})