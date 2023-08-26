<template>
    <v-container class="d-flex fill-height justify-center align-center" tag="section">
        <v-card width="35%" elevation="10">
            <div class="pa-7 pa-sm-10">
                <h2 class="font-weight-bold mt-4 text--darken-2">Sign in</h2>
                <h6 class="text-subtitle-1 text-grey-darken-1">Don't have an account?</h6>
                <NuxtLink to="/auth/register" class="text-primary text-decoration-none">Sign up</NuxtLink>

                <v-form ref="form" v-model="valid" @submit.prevent="signIn">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" class="mt-4" required
                        variant="outlined"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type='password' required
                        variant="outlined"></v-text-field>

                    <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                        <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']"
                            label="Remember me?" required hide-details></v-checkbox>
                        <div class="ml-auto">
                            <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot pwd?</a>
                        </div>
                    </div>
                    <v-btn color="primary" block class="py-6" type="submit" :disabled="disabled">{{
                        disabled ? 'Please wait' : 'Sign In' }}</v-btn>
                </v-form>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})
const { $firebaseAuth } = useNuxtApp()
const { signInUser } = useFirebase($firebaseAuth)
const valid = ref(true)
const disabled = ref(false)
const checkbox = ref(false)
const router = useRouter()

const email = ref('')
const password = ref('')

const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 6) || 'Password must be more than 6 characters'
])

const emailRules = ref([
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
])

const signIn = async () => {
    disabled.value = true
    try {
        await signInUser(email.value, password.value)
        router.push('/')
    } catch (error) {
        alert(error)
    }
    disabled.value = false
}
</script>

<style scoped></style>