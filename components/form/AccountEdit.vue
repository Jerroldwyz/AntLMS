<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="saveChange"
    >
      <h4>Name</h4>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        variant="outlined"
        required
      ></v-text-field>
      <h4>Email</h4>
      <span
        v-if="emailVerified"
        class="text-caption text-green"
        >Verified</span
      >
      <div v-else>
        <span class="text-red">Not verified </span>
        <NuxtLink
          class="text-blue"
          @click="handleEmailVerification"
          >send me email verification</NuxtLink
        >
      </div>
      <v-text-field
        v-model="email"
        disabled
        variant="outlined"
      ></v-text-field>
      <h4>Pronouns</h4>
      <v-select
        v-model="pronoun"
        :items="pronouns"
        variant="outlined"
        required
      ></v-select>
      <h4>Phone number</h4>
      <FormPhoneNumberInput
        :phone-number-value="phoneNumber"
        @formatted-phone-number="onFormattedPhoneNumber"
      />
      <v-btn
        type="submit"
        color="blue"
        variant="elevated"
        >Save changes</v-btn
      >
    </v-form>
    <v-alert
      v-if="hasUpdated"
      type="success"
      title="Successfully updated"
      closable
      >You have successfully updated your account</v-alert
    >
    <v-alert
      v-else
      type="error"
      title="Failed"
      closable
      >Failed to update your account. Please try again</v-alert
    >
  </v-container>
</template>

<script setup lang="ts">
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"

const userStore = useUserStore()
const { $firebaseAuth } = useNuxtApp()
const valid = ref(false)
const name = ref(userStore.user?.name)
const email = ref(userStore.user?.email)
const emailVerified = $firebaseAuth.currentUser?.emailVerified
const phoneNumber = ref(userStore.user?.contact_details.phone_number || null)
const formattedPhoneNumber = ref()
const pronouns = ["Do not specify", "He/Him", "She/Her", "They/Them"]
const pronoun = ref<string>(
  (userStore.user?.contact_details.pronoun as string) || pronouns[0],
)
const hasUpdated = ref<boolean>(true)

const nameRules = [(v: string) => !!v || "Name is required"]

const onFormattedPhoneNumber = (value: string) => {
  formattedPhoneNumber.value = value
}

const saveChange = async () => {
  hasUpdated.value = false
  if (valid.value) {
    try {
      await userStore
        .updateDetails({
          name: name.value,
          email: email.value,
          contact_details: {
            pronoun: pronoun.value,
            phone_number: formattedPhoneNumber.value,
          },
        })
        .then((result) => {
          hasUpdated.value = true
        })
        .catch((error) => {
          hasUpdated.value = false
          throw new Error(
            "An error has occurred while updated your profile",
            error,
          )
        })
    } catch (error) {
      throw new Error("failed to update")
    }
  }
}

const emailVerificationSent = ref(false)

const handleEmailVerification = () => {
  const { $firebaseAuth } = useNuxtApp()
  const currentUser = $firebaseAuth.currentUser
  if (currentUser) {
    sendEmailVerification($firebaseAuth.currentUser, {
      url: window.location.href,
    })
      .then((result) => {
        alert(
          "We have sent you a verification link to your email. Pleas check your email inbox or spam folder",
        )
      })
      .catch((error) => {
        throw new Error(
          "An error has occurred while trying to send you a verification email link. Please try again.",
          error,
        )
      })
  }
  emailVerificationSent.value = false
}
</script>

<style>
.v-alert {
  position: fixed;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 50%);
  margin: 0 auto;
}
</style>
