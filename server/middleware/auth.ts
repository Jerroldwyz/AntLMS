import { createError } from 'nuxt/dist/app/composables'

export default defineEventHandler(async (e) => {
  if (e.node.req.url?.includes('/api')) {
    const token = (await getCookie(e, 'token')) as string
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'You must be signed in to access.',
      })
    }
  }
})
