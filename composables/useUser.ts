import { User } from "~~/types"

// user auth state observer
export default () => {
  // TODO: usser??
  return useState<User | null>("user", () => null)
}
