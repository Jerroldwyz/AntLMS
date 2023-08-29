import { User } from '~~/types'

// user auth state observer
export default () => {
  return useState<User | null>('usser', () => null)
}
