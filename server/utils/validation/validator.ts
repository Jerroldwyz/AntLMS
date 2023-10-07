import { H3Event } from "h3"
import { ValidationError } from "yup"

export const validator = async (schema: any, event: H3Event) => {
  const body = await readBody(event)

  try {
    schema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    })
  } catch (e) {
    const error = e as ValidationError

    return sendError(
      event,
      createError({
        statusCode: 422,
        statusMessage: JSON.stringify(error.errors),
      }),
    )
  }
}

type NameValue = {
  name: string
  value: string | undefined
  type: "number" | "string" | "uuid" | "string[]"
}

type Params = {
  routeParams?: NameValue[]
  queryParams?: NameValue[]
  requestBodyParams?: NameValue[]
}

export const parseParams = (params: Params) => {
  const { routeParams, queryParams, requestBodyParams } = params

  const invalidRouteParameters: string[] = []
  const invalidQueryParameters: string[] = []
  const invalidRequestBodyParameters: string[] = []

  const missingRouteParameters: string[] = []
  const missingRequestBodyParameters: string[] = []

  const errorObject: {
    statusCode: number
    statusMessage: string
    cause: {
      invalidRouteParameters?: string[]
      invalidQueryParameters?: string[]
      invalidRequestBodyParameters?: string[]
      missingRouteParameters?: string[]
      missingRequestBodyParameters?: string[]
    }
  } = {
    statusCode: 400,
    statusMessage: "Required fields are missing or invalid.",
    cause: {},
  }

  let errorEncountered = false

  if (routeParams !== undefined) {
    routeParams.forEach((routeParam) => {
      const { name, value, type } = routeParam
      if (value === undefined) {
        missingRouteParameters.push(name)
      } else if (type === "number") {
        if (isNaN(parseInt(value))) {
          invalidRouteParameters.push(name)
        }
      } else if (type === "uuid") {
        const uuidPattern =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        if (!uuidPattern.test(value)) {
          invalidRouteParameters.push(name)
        }
      } else if (type === "string[]") {
        try {
          const json = JSON.parse(value) as []
          if (json.every((x) => typeof x === "string")) {
            invalidRouteParameters.push(name)
          }
        } catch (e) {
          invalidRouteParameters.push(name)
        }
      }
    })
  }

  if (queryParams !== undefined) {
    queryParams.forEach((queryParam) => {
      const { name, value, type } = queryParam
      if (value !== undefined) {
        if (type === "number") {
          if (isNaN(parseInt(value))) {
            invalidQueryParameters.push(name)
          }
        } else if (type === "uuid") {
          const uuidPattern =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
          if (!uuidPattern.test(value)) {
            invalidQueryParameters.push(name)
          }
        }
      }
    })
  }

  if (requestBodyParams !== undefined) {
    requestBodyParams.forEach((requestBodyParam) => {
      const { name, value, type } = requestBodyParam
      if (value === undefined) {
        missingRequestBodyParameters.push(name)
      } else if (type === "number") {
        if (isNaN(parseInt(value))) {
          invalidRequestBodyParameters.push(name)
        }
      } else if (type === "uuid") {
        const uuidPattern =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        if (!uuidPattern.test(value)) {
          invalidRequestBodyParameters.push(name)
        }
      }
    })
  }

  if (invalidRouteParameters.length > 0) {
    errorObject.cause.invalidRouteParameters = invalidRouteParameters
    errorEncountered = true
  }
  if (invalidQueryParameters.length > 0) {
    errorObject.cause.invalidQueryParameters = invalidQueryParameters
    errorEncountered = true
  }
  if (invalidRequestBodyParameters.length > 0) {
    errorObject.cause.invalidRequestBodyParameters =
      invalidRequestBodyParameters
    errorEncountered = true
  }
  if (missingRequestBodyParameters.length > 0) {
    errorObject.cause.missingRequestBodyParameters =
      missingRequestBodyParameters
    errorEncountered = true
  }
  if (missingRouteParameters.length > 0) {
    errorObject.cause.missingRouteParameters = missingRouteParameters
    errorEncountered = true
  }

  if (errorEncountered) {
    throw createError(errorObject)
  }
}
