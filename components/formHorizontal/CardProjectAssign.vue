<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue'

const fname = ref('')
const lname = ref('')
const Email = ref('')
const etext = ref('')
const contactno = ref('')
const cname = ref('')
const interest = ref([
  'Choose your option',
  'Designing',
  'Development',
  'Hacking',
])
const budget = ref([
  'Choose your option',
  'Less than $5000',
  '$5000 to $10000',
  '$10000 to %15000',
])
</script>

<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title text-h6">Project Assigning</h3>
      <h6 class="text-subtitle-1 text-grey-darken-1">
        This is the basic horizontal form with labels on left and form controls
        on right in one line. To use add class form-horizontal to the form tag
        and give class row with form-group.
      </h6>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="pa-5">
      <h3 class="title text-h6">Personal Info</h3>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>First Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="fname"
              filled
              background-color="transparent"
              placeholder="Enter First Name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Last Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="lname"
              filled
              background-color="transparent"
              placeholder="Enter Last name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Email</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="etext"
              filled
              background-color="transparent"
              placeholder="Enter Email"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Contact No</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="contactno"
              type="tel"
              filled
              background-color="transparent"
              placeholder="Enter Contact No"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="pa-5">
      <h3 class="title text-h6">Requirements</h3>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Company</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="cname"
              filled
              background-color="transparent"
              placeholder="Enter Company Name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Interested In</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              :items="interest"
              filled
              background-color="transparent"
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Budget</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-select
              :items="budget"
              filled
              background-color="transparent"
              hide-details
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>About Project</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="cname"
              filled
              background-color="transparent"
              placeholder="Enter About Project"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <div class="pa-5 text-right">
      <v-btn color="secondary" class="text-capitalize mr-2">Save</v-btn>
      <v-btn color="primary" class="text-capitalize" dark>Cancel</v-btn>
    </div>
  </v-card>
</template>
