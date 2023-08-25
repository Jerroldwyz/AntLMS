import { updateContent } from "~~/server/db/content";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    return await updateContent(parseInt(body.contentId as string), body.content as string);
})