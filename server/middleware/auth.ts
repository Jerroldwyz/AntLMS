import { getApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { env } from "process"

export default defineEventHandler(async (event) => {
  // if (event.node.req.url?.includes('/api/signin')) {
  //   return
  // }
  // if (event.node.req.url?.includes('/api/')) {
  //   const token = getCookie(event, 'token') as string
  //   if (!token) {
  //     throw createError({
  //       statusCode: 401,
  //       statusMessage: 'You must be signed in to access the resource',
  //     })
  //   }
  // }
})
