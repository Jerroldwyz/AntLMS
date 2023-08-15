
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Ivalid params'
        }))
    }

    if (email !== "sahil") {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username is invalid'
        }))
    }

    if (password !== "123") {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'password is invalid'
        }))
    }

    const accessToken = "12345";

    return {
        accessToken: accessToken, user: {
            id: "1",
            name: "sahil",
            email: "super.sahil.99@gmail.com"
        }
    }
})