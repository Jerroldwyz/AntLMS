import { prisma } from ".";

export const getQuestionById = (question_id: number) => {

    return prisma.questions.findUnique({
        where: {
            id: question_id
        },
        select: {
            question_text: true,
            explanation: true,
            choices: {
                select: {
                    choice_text: true,
                    id: true,
                }
            }
        },
    });
}

export const createQuestion = async (question_data: any) => {
    return prisma.questions.create({
        data: question_data
    });
}

export const updateQuestion = (question_id: number, question_text: string, explanation: string) => {
    return prisma.questions.update({
        where: {
            id: question_id
        },
        data: {
            question_text: question_text,
            explanation: explanation
        },
    });
}

export const updateChoice = (question_id: number, choice_data: any) => {
    return prisma.questions.update({
        where: {
            id: question_id
        },
        data: {
            choices: choice_data,
        },
    });
}

export const deleteQuestion = (question_id: number) => {
    return prisma.questions.delete({
        where: {
            id: question_id
        },
    });
}