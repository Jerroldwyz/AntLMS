import { getCourses } from "~~/server/db/mycourse";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    return await getCourses(parseInt(query.courseId as string));
})