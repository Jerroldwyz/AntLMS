<template>
    <v-container class="d-flex fill-height justify-center align-center" tag="section">
        <v-card width="35%" elevation="10">
            <div class="pa-7 pa-sm-10">
                <h2 class="font-weight-bold mt-4 text--darken-2">Sign up</h2>
                <h6 class="text-subtitle-1 text-grey-darken-1">Already have an account?
                    <NuxtLink to="/login" class="text-primary text-decoration-none">Sign in</NuxtLink>
                </h6>
                <v-form ref="form" v-model="valid" @submit.prevent="signUp">
                    <v-text-field v-model="firstName" :rules="nameRules" label="First name" class="mt-4"
                        required></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" class="mt-4" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" class="mt-4"
                        required></v-text-field>
                    <v-text-field v-model="confirmedPassword" :rules="passwordValidation" label="Confirm password"
                        type="password" class="mt-4"></v-text-field>
                    <v-btn color="primary" block class="py-6" type="submit" :disabled="disabled">{{
                        disabled ? 'Creating new user' : 'Sign Up' }}</v-btn>
                </v-form>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { IUser } from '~~/types'

const { $firebaseAuth } = useNuxtApp()
const { createUser } = useFirebase($firebaseAuth)
const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const confirmedPassword = ref('')
const valid = ref(true)
const disabled = ref(false)
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref(0)

const nameRules = ref([
    (v: string) => !!v || 'Name is required'
])

const emailRules = ref([
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
])

const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 6) || 'Password must be more than 6 characters'
])

const passwordValidation = ref([
    (v: string) => !!v || 'Confirmed password is required',
    () => password.value === confirmedPassword.value || 'Password must match'
])

const signUp = async () => {
    disabled.value = true
    try {
        const newUser: IUser = await createUser(email.value, password.value)
        await userStore.create(newUser.uid, newUser.email)
        router.push('/login')
    } catch (error) {
        alert(error)
    }
}

</script>

<style scoped></style>