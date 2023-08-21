import { getCourseById } from "~~/server/db/course";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    return await getCourseById(parseInt(query.courseId as string));
})