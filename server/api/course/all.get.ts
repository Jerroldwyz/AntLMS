import { getCourses } from "~~/server/db/course";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    return await getCourses(parseInt(query.userId as string));
})