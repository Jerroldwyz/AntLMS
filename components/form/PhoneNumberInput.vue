<template>
  <div>
    <span class="text-caption text-green">
      Your international phone number is
      <b>{{ getFormattedPhoneNumber() }}</b>
    </span>
    <v-row class="">
      <v-col
        cols="4"
        class="pr-0"
      >
        <v-combobox
          v-model="selectedCountry"
          :items="countries"
          variant="solo-filled"
        ></v-combobox>
      </v-col>
      <v-col class="pl-0">
        <v-text-field
          v-model="phoneNumber"
          placeholder="Enter phone number"
          variant="outlined"
          class="mb-0"
          :rules="phoneNumberRules"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import {
  parsePhoneNumber,
  parsePhoneNumberFromString,
  getCountries,
} from "libphonenumber-js"

const props = defineProps(["phoneNumberValue"])
const emit = defineEmits(["formatted-phone-number"])

const countries = getCountries()
const selectedCountry = ref("")
const phoneNumber = ref("")

if (props.phoneNumberValue) {
  const retrievedPhoneNumber = parsePhoneNumber(props.phoneNumberValue)
  selectedCountry.value = retrievedPhoneNumber.country
  phoneNumber.value = retrievedPhoneNumber.formatNational()
}

const phoneNumberRules = [
  (v) => {
    const parsedPhoneNumber = getParsedPhoneNumber()
    if (parsedPhoneNumber && !parsedPhoneNumber.isValid())
      return "Please enter a valid phone number"
  },
]

const getParsedPhoneNumber = () => {
  const parsedPhoneNumber = parsePhoneNumberFromString(
    phoneNumber.value,
    selectedCountry.value,
  )
  return parsedPhoneNumber
}

const getFormattedPhoneNumber = () => {
  const parsedPhoneNumber = getParsedPhoneNumber()
  return parsedPhoneNumber ? parsedPhoneNumber.formatInternational() : ""
}

watch([selectedCountry, phoneNumber], () => {
  emit("formatted-phone-number", getFormattedPhoneNumber())
})
</script>
