export const primsaErrorHandler = (err: any) => {
  switch (err.code) {
    case "P2001":
      return customError(
        "The record searched for in the where condition does not exist",
        400,
      )
    case "P2002":
      return customError(
        "Unique constraint failed. Duplicated primary/composite key not allowed",
        400,
      )
    case "P2003":
      return customError("Foreign key constraint failed", 400)
    case "P2004":
      return customError(
        "Maximum number of allowed connections has been reached",
        503,
      )
    case "P2005":
      return customError("Query execution was interrupted by the user", 400)
    case "P2006":
      return customError("Query execution timed out", 504)
    case "P2007":
      return customError("Database connection was lost", 500)
    case "P2008":
      return customError("Database error occurred", 500)
    case "P2009":
      return customError(
        "Query was not executed because the schema is not up to date",
        409,
      )
    case "P2010":
      return customError(
        "Query was not executed because the data model is not up to date",
        409,
      )
    case "P2011":
      return customError(
        "Query was not executed because the client is not authorized to perform the operation",
        403,
      )
    case "P2012":
      return customError(
        "Query was not executed because the operation is not supported by the database",
        500,
      )
    case "P2013":
      return customError(
        "Query was not executed because the operation is not supported by the Prisma ORM",
        500,
      )
    case "P2014":
      return customError(
        "Query was not executed because an internal error occurred",
        500,
      )
    case "P2015":
      return customError(
        "Query was not executed because the Prisma schema is invalid",
        500,
      )
    case "P2016":
      return customError(
        "Query was not executed because the Prisma client is not configured correctly",
        500,
      )
    case "P2017":
      return customError(
        "The records for relation {relation_name} between the {parent_name} and {child_name} models are not connected",
        404,
      )
    case "P2021":
      return customError(
        "The table does not exist on the current database",
        404,
      )
    case "P2022":
      return customError(
        "The column does not exist in the current database",
        404,
      )
    case "P2025":
      return customError(
        "An operation failed because it depends on one or more records that were required but not found.",
        400,
      )
    default:
      return customError("Unknown error occurred", 500)
  }
}

const customError = (err: string, code: number) => {
  return createError({
    statusCode: code,
    statusMessage: err,
  })
}
