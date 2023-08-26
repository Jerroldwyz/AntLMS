import { getQuestionById } from "~~/server/db/question";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    const question = await getQuestionById(parseInt(query.questionId as string));

    return question;
})