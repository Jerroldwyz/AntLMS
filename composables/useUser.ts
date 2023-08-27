import { IUser } from '~~/types'

// user auth state observer
export default () => {
  return useState<IUser | null>('usser', () => null)
}
