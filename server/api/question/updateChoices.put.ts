import { updateChoice } from "~~/server/db/question";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const question = await updateChoice(parseInt(body.questionId as string), body.choices);

    return question;
})