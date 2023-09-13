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
        <h2 class="font-weight-bold mt-4 text--darken-2">Sign in</h2>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Don't have an account?
        </h6>
        <NuxtLink
          to="/auth/register"
          class="text-primary text-decoration-none"
          >Sign up</NuxtLink
        >

        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="signIn"
        >
          <v-text-field
            v-model="newEmail"
            :rules="emailRules"
            label="E-mail"
            class="mt-4"
            required
            variant="outlined"
          ></v-text-field>
          <v-text-field
            v-model="newPassword"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
            variant="outlined"
          ></v-text-field>

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
                >Forgot pwd?</a
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
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  email: string
  password: string
}>()

const newEmail = props.email
const newPassword = props.password
</script>

<style scoped></style>
