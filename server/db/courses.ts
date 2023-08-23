import { prisma } from ".";

export const getCourseById = (course_id: number) => {

    return prisma.courses.findUnique({
        where: {
            id: course_id
        },
        select: {
            title: true,
            thumbnail: true,
            creator: {
                select: {
                    name: true,
                }
            },
            topics: {
                select: {
                    title: true,
                    content: {
                        select: {
                            title: true,
                            type: true,
                            topic_position: true,
                        }
                    },
                    quizzes: {
                        select: {
                            id: true,
                            title: true,
                            topic_position: true,
                        }
                    }
                }
            },
            course_tags: {
                select: {
                    tag: {
                        select: {
                            name: true,
                        }
                    }
                }
            }
        },
    });
}

export const getCourses = () => {

    return prisma.courses.findMany({
        select: {
            id: true,
            title: true,
            enabled: true,
            thumbnail: true,
            creator: {
                select: {
                    name: true,
                }
            }
        },
    });
}
