import { getCourseById } from "~~/server/db/mycourse";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    return await getCourseById(parseInt(query.courseId as string));
})