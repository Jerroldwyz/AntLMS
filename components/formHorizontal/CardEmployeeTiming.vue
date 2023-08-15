<script setup lang="ts">
import { ref } from 'vue'

const ename = ref('')
const pname = ref('')
const date = ref('')
const rate = ref('')
const stime = ref('')
const etime = ref('')
const notes = ref('')
</script>

<template>
  <v-card class="mb-7">
    <v-card-text class="pa-5">
      <h3 class="title text-h6">Employee Timing</h3>
      <h6 class="text-subtitle-1 text-grey-darken-1">
        This is the employee timing form with labels on left and form controls
        on right in one line. To use add class form-horizontal to the form tag
        and give class row with form-group.
      </h6>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="pa-5">
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Employee Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="ename"
              filled
              background-color="transparent"
              placeholder="Enter Employee name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Project Name</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="pname"
              filled
              background-color="transparent"
              placeholder="Enter Project name"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Date</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="date"
              filled
              background-color="transparent"
              type="date"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Rate Per Hour</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="rate"
              filled
              background-color="transparent"
              placeholder="Enter Rate Per Hour"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Start Time</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="stime"
              filled
              background-color="transparent"
              type="time"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>End Time</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="etime"
              filled
              background-color="transparent"
              type="time"
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="2" class="d-flex align-center">
            <label>Notes</label>
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="notes"
              filled
              background-color="transparent"
              placeholder="Notes here"
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
