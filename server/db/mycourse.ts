import { prisma } from ".";

export const getCourseById = (course_id: number) => {

    return prisma.courses.findUnique({
        where: {
            id: course_id
        },
        select: {
            title: true,
            enabled: true,
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
                            content: true,
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

export const getCourses = (creator_id: number) => {

    return prisma.courses.findMany({
        where: {
            creator_id: creator_id
        },
        select: {
            id: true,
            title: true,
            enabled: true,
            thumbnail: true,
        },
    });
}

export const createCourse = async (course_data: any) => {
    // return prisma.courses.create({
    //     data: course_data
    // });
    return prisma.courses.create({
        data: {
            title: course_data.title,
            creator_id: course_data.creatorId,
            thumbnail: course_data.thumbnail,
            course_tags: {
                create: course_data.tags.map((t: any) => ({
                    tag: {
                        connectOrCreate: {
                            where: { name: t },
                            create: { name: t }
                        }
                    }
                }))
            }
        },
        include: {
            course_tags: true
        }
    });
}

export const updateCourseTitle = (account_id: number, course_title: string) => {
    return prisma.courses.update({
        where: {
            id: account_id
        },
        data: {
            title: course_title
        },
    });
}

export const updateCourseThumbnail = (course_id: number, thumbnail: string) => {
    return prisma.courses.update({
        where: {
            id: course_id
        },
        data: {
            thumbnail: thumbnail
        },
    });
}

export const changeEnabled = (course_id: number, enabled: boolean) => {

    return prisma.courses.update({
        where: {
            id: course_id
        },
        data: {
            enabled: enabled
        },
    });
}

export const deleteCourse = (course_id: number) => {
    return prisma.courses.delete({
        where: {
            id: course_id
        },

    });
}