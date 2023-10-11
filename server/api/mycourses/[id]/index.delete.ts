import { InferType, number } from "yup"
import { deleteCourse } from "~/server/utils/db/mycourse"

export default defineEventHandler(async (event) => {
  // Route params
  const unvalidatedId = getRouterParam(event, "id")
  const IdSchema = number().required().integer().min(1)
  type IdType = InferType<typeof IdSchema>
  const id = await validateAndParse<IdType>({
    schema: IdSchema,
    value: unvalidatedId,
    msgOnError: "Bad request router params",
  })

  let data
  try {
    const courseId = id
    data = await deleteCourse(courseId)
  } catch (e) {
    throw prismaErrorHandler(e)
  }

  return courseTransformer(data)
})
