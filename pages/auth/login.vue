<template>
  <v-container
    class="d-flex fill-height justify-center align-center"
    tag="section"
  >
    <v-card
      width="35%"
      elevation="10"
    >
      <div class="pa-7 pa-sm-10">
        <h2 class="font-weight-bold mt-4">Sign in</h2>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signIn"
        >
          <FormEmailInput v-model="email" />
          <FormPasswordInput v-model="password" />

          <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
            <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Remember me?"
              required
              hide-details
            ></v-checkbox>
            <div class="ml-auto">
              <a
                href="javascript:void(0)"
                class="text-primary text-decoration-none"
                >Forgot password?</a
              >
            </div>
          </div>
          <v-btn
            color="primary"
            block
            class="py-6"
            type="submit"
            :disabled="disabled"
            >{{ disabled ? "Please wait" : "Sign In" }}</v-btn
          >
        </v-form>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="text-primary text-decoration-none"
            >Sign up</NuxtLink
          >
        </h6>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: "guest",
})

const authStore = useAuthStore()
const valid = ref(true)
const disabled = ref(false)
const checkbox = ref(false)
const router = useRouter()

const email = ref("")
const password = ref("")

const signIn = async () => {
  disabled.value = true
  try {
    await authStore.login(email.value, password.value)
    router.push("/")
  } catch (error) {
    alert(error)
  }
  disabled.value = false
}
</script>

<style scoped></style>
