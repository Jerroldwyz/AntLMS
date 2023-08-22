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
            }
        },
    });
}

export const createCourse = (course_data: any) => {
    return prisma.courses.create({
        data: course_data
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