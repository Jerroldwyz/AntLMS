<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'
import BaseCard from '@/components/baseComponents/BaseCard.vue'

import CardProjectAssign from '@/components/form-action/CardProjectAssign.vue'
import CardEmployeeProfile from '@/components/form-action/CardEmployeeProfile.vue'
import CardDonation from '@/components/form-action/CardDonation.vue'
import CardComplaintForm from '@/components/form-action/CardComplaintForm.vue'
import CardEmployeeTiming from '@/components/form-action/CardEmployeeTiming.vue'
import CardIssueTracking from '@/components/form-action/CardIssueTracking.vue'
import CardEventRegistration from '@/components/form-action/CardEventRegistration.vue'

const page = ref({ title: 'Form Action' })
const breadcrumbs = ref([
  {
    text: 'Form Elements',
    disabled: false,
    to: '#',
  },
  {
    text: 'Autocompletes',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Project Assign">
        <CardProjectAssign></CardProjectAssign>
      </BaseCard>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Employee Profile">
        <CardEmployeeProfile></CardEmployeeProfile>
      </BaseCard>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Donation Form">
        <CardDonation></CardDonation>
      </BaseCard>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Compaint Form">
        <CardComplaintForm></CardComplaintForm>
      </BaseCard>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Employee Training">
        <CardEmployeeTiming></CardEmployeeTiming>
      </BaseCard>
    </v-col>
    <v-col cols="12" lg="6" class="d-flex align-items-stretch">
      <BaseCard heading="Card Issue Tracking">
        <CardIssueTracking></CardIssueTracking>
      </BaseCard>
    </v-col>
    <v-col cols="12">
      <BaseCard heading="Event Registration">
        <CardEventRegistration></CardEventRegistration>
      </BaseCard>
    </v-col>
  </v-row>
</template>
