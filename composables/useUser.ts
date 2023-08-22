import { IUser } from '~~/types'

export default () => {
  return useState<IUser | null>('usser', () => null)
}
