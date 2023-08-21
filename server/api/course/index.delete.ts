import { deleteCourse } from "~~/server/db/course";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return await deleteCourse(parseInt(body.courseId as string));
})