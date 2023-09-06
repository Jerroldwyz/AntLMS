import { uploadFile } from "~~/server/s3/helpers"

export default defineEventHandler(async (event) => {
  console.log(getHeaders(event))
  await uploadFile("antlms", "/test/object.blah", event.node.req, {
    ContentType: "image/jpeg",
  })
  return "We did it"
})
