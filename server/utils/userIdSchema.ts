import { string } from "yup"

export const userIdSchema = () => {
  return string().required()
}
