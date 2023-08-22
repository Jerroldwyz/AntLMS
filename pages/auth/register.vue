<template>
    <v-container class="d-flex fill-height justify-center align-center" tag="section">
        <v-card width="35%" elevation="10">
            <div class="pa-7 pa-sm-10">
                <h2 class="font-weight-bold mt-4 text--darken-2">Sign up</h2>
                <h6 class="text-subtitle-1 text-grey-darken-1">Already have an account?
                    <NuxtLink to="/login" class="text-primary text-decoration-none">Sign in</NuxtLink>
                </h6>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" class="mt-4" required></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" class="mt-4"
                        required></v-text-field>
                    <v-text-field v-model="confirmedPassword" :rules="passwordRules" label="Confirm password"
                        type="password" class="mt-4"></v-text-field>
                </v-form>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmedPassword = ref('')
const valid = ref(true)

const emailRules = ref([
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
])

const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length >= 6) || 'Password must be more than 6 characters'
])

const passwordValidation = computed(() => {
    return password.value === confirmedPassword.value || 'Password must match'
})
</script>

<style scoped></style>