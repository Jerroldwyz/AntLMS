import { updateAccount } from "~~/server/db/account";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user = body;

    return await updateAccount(user.userId, user.contactDetails);
})