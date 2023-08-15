import { createUserWithEmailAndPassword } from 'firebase/auth'
import { User } from '~~/types/User'

export default () => {
  const { $auth } = useNuxtApp()

  const user = useState<User | null>('new_user', () => null)

  const registerUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await createUserWithEmailAndPassword($auth, email, password)
    }
  }
}
