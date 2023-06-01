<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'

import CardProjectAssign from '@/components/form-horizontal/CardProjectAssign.vue'
import CardEmployeeProfile from '@/components/form-horizontal/CardEmployeeProfile.vue'
import CardEmployeeTiming from '@/components/form-horizontal/CardEmployeeTiming.vue'
import CardEventRegistration from '@/components/form-horizontal/CardEventRegistration.vue'

const page = ref({ title: 'Form Horizontal' })
const breadcrumbs = ref([
  {
    text: 'Form Elements',
    disabled: false,
    to: '#',
  },
  {
    text: 'Form Horizontal',
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
    <v-col cols="12">
      <CardProjectAssign></CardProjectAssign>
      <CardEmployeeProfile></CardEmployeeProfile>
      <CardEmployeeTiming></CardEmployeeTiming>
      <CardEventRegistration></CardEventRegistration>
    </v-col>
  </v-row>
</template>
