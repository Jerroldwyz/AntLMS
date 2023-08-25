import { getContentById } from "~~/server/db/content";

export default defineEventHandler(async (event) => {
    const query = await getQuery(event);

    return await getContentById(parseInt(query.contentId as string));
})