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
</script>

<template>
  <v-container id="login" class="d-flex fill-height align-center justify-center" tag="section">
    <v-card width="50%" elevation="10">
      <div class="pa-7 pa-sm-10">
        <img src="/images/logo-icon.png" />
        <h2 class="font-weight-bold mt-4 text--darken-2">Sign in</h2>
        <h6 class="text-subtitle-1 text-grey-darken-1">
          Don't have an account?
          <a href="/authentication/boxedregister" class="text-primary text-decoration-none">Sign Up</a>
        </h6>


        <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" class="mt-4" required
            variant="outlined"></v-text-field>
          <v-text-field v-model="password" :counter="10" :rules="passwordRules" label="Password" required
            variant="outlined" type="password"></v-text-field>

          <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
            <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']" label="Remember me?"
              required hide-details></v-checkbox>
            <div class="ml-auto">
              <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot pwd?</a>
            </div>
          </div>
          <v-btn color="secondary" to="/dashboards/minimal" block class="py-6" submit>Sign In</v-btn>
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
