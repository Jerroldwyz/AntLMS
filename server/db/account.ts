
import { prisma } from ".";

export const getAccountById = (account_id: number) => {

    return prisma.users.findUnique({
        where: {
            id: account_id
        },
        select: {
            email: true,
            name: true,
            contact_details: true,
        },
    });
}

export const updateAccount = (account_id: number, contact_details = {}) => {
    return prisma.users.update({
        where: {
            id: account_id
        },
        data: {
            contact_details: contact_details,
        }
    });
}

export const deleteAccount = (account_id: number) => {
    return prisma.users.delete({
        where: {
            id: account_id
        },
    });
}