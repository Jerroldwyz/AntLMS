import { updateTopicTitle } from "~~/server/db/topic";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return await updateTopicTitle(parseInt(body.topicId as string), body.title as string);
})