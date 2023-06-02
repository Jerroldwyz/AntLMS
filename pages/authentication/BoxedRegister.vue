<script setup lang="ts">
import { ref } from 'vue'
definePageMeta({
  layout: 'blank',
})
const checkbox = ref(false)
const valid = ref(true)
const password = ref('')
const email = ref('')
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) =>
    (v && v.length <= 10) || 'Password must be less than 10 characters',
])
const emailRules = ref([
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
const fname = ref('')
const fnameRules = ref([
  (v: string) => !!v || 'Name is required',
  (v: string) =>
    (v && v.length <= 10) || 'Name must be less than 10 characters',
])
</script>

<template>
  <v-container id="login" class="d-flex fill-height align-center justify-center" tag="section">
    <v-card width="50%" elevation="10">
      <div class="pa-7 pa-sm-10">
        <img src="/images/logo-icon.png" />
        <h2 class="font-weight-bold mt-4 text--darken-2">Sign Up</h2>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Already have an account?
          <a href="/authentication/boxedlogin" class="text-primary text-decoration-none">Sign In</a>
        </h6>

        <v-form ref="form" v-model="valid" lazy-validation action="/pages/boxedlogin">
          <v-text-field v-model="fname" :rules="fnameRules" label="Full Name" class="mt-4" required variant="outlined"></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required variant="outlined"></v-text-field>
          <v-text-field v-model="password" :counter="10" :rules="passwordRules" label="Password" required variant="outlined" type="password"></v-text-field>

          <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
            <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']" label="I agree to the terms and privacy" required hide-details></v-checkbox>
          </div>
          <v-btn color="secondary" block class="mr-4 py-6" submit>Sign Up</v-btn>
        </v-form>

        <div class="text-center mt-6">
          <div class="d-flex align-center justify-center gap-2">
            <v-btn icon color="secondary">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon color="primary">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>
