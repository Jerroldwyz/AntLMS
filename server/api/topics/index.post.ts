import { createTopic } from "~~/server/db/topic";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const prismaQuery = {
        course_id: body.courseId,
        title: body.title,
    }

    return await createTopic(prismaQuery);
})