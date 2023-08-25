import { getCourseById } from "~~/server/db/mycourse";
import { mycourseTransformer } from "~~/server/transformers/mycourse";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    const course = await getCourseById(parseInt(query.courseId as string));

    return mycourseTransformer(course);
})