import { createCourse } from "~~/server/db/course";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const course = body;

    const prismaData = {
        title: course.title,
        creator_id: course.creator_id,
        thumbnail: course.thumbnail,
    }

    return await createCourse(prismaData);
})