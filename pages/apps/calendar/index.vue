<template>
  <v-row>
    <v-col cols="12" lg="4" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar with Date</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="date"
            :is-dark="customizer.darktheme"
            is-expanded
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar with Min Date</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="date"
            :is-dark="customizer.darktheme"
            is-expanded
            :min-date="new Date()"
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar with Max Date</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="date"
            :is-dark="customizer.darktheme"
            is-expanded
            :max-date="new Date()"
          />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar Date Range</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="range"
            :is-dark="customizer.darktheme"
            is-range
          />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar Date & Time</v-card-title>
        <v-card-text>
          <div>
            <div class="flex mb-2">
              <label class="text-gray-600 font-medium"
                ><input
                  v-model="timezone"
                  class="mr-1"
                  type="radio"
                  value=""
                />Local</label
              >
              <label class="text-gray-600 font-medium ml-3"
                ><input
                  v-model="timezone"
                  class="mr-1"
                  type="radio"
                  value="utc"
                />UTC</label
              >
            </div>
            <v-date-picker
              v-model="date"
              :is-dark="customizer.darktheme"
              mode="dateTime"
              :timezone="timezone"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="12" sm="12">
      <v-card>
        <v-card-title class="h4 pa-6 pb-0">Calendar Month Steps</v-card-title>
        <v-card-text>
          <v-date-picker
            v-model="date"
            :is-dark="customizer.darktheme"
            :rows="2"
            :step="1"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import 'v-calendar/dist/style.css'
import { ref } from 'vue'
import { useCustomizerStore } from '@/stores/customizer'

const date = ref(new Date())
const timezone = ref('')
const customizer = useCustomizerStore()
const range = ref({
  start: new Date(2020, 0, 1),
  end: new Date(2020, 0, 5),
})
</script>
