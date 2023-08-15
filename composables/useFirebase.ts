import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '~~/types/User'

export default () => {
  const { $auth } = useNuxtApp()

  const user = useState<User | null>('firebase_user', () => null)

  const registerUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const credentials = await createUserWithEmailAndPassword(
      $auth,
      email,
      password
    )
    return new Promise((resolve, reject) => {
      try {
        if (credentials) {
          user.value = credentials.user
          resolve(true)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    user,
    registerUser,
  }
}
