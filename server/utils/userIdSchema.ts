import { string } from "yup"

export const userIdSchema = () => {
  return string().required()
}

export const optionalIdSchema = () => {
  return string().optional()
}
