import { prisma } from '../../db/index';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    return await prisma.topics.create({
        data: {
            course_id: body.course_id,
            title: body.title,
        },
    })
})