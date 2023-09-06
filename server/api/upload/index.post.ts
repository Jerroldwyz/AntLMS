import { stdout } from "process"
import { uploadFile } from "~~/server/s3/helpers"

export default defineEventHandler(async (event) => {
  console.log(event.node.req.headers)
  // TODO changed fixed bucket name
  await uploadFile("antlms", "/test/object.blah", event.node.req, {
    ContentType: "image/jpeg",
  })
  return "We did it"
})
