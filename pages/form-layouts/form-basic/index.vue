<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'

import CardGeneralForm from '@/components/form-basic/CardGeneralForm.vue'
import CardDefaultForm from '@/components/form-basic/CardDefaultForm.vue'
import CardSampleForm from '@/components/form-basic/CardSampleForm.vue'
import CardDefaultBasicForm from '@/components/form-basic/CardDefaultBasicForm.vue'
import CardInputGroupForm from '@/components/form-basic/CardInputGroupForm.vue'
import CardInputStateForm from '@/components/form-basic/CardInputStateForm.vue'
import CardDisabledForm from '@/components/form-basic/CardDisabledForm.vue'
import CardSimpleForm from '@/components/form-basic/CardSimpleForm.vue'
import CardSampleFormwithIcons from '@/components/form-basic/CardSampleFormwithIcons.vue'
import CardSampleFormwithRightIcons from '@/components/form-basic/CardSampleFormwithRightIcons.vue'

const page = ref({ title: 'Form Basic' })
const breadcrumbs = ref([
  {
    text: 'Form Elements',
    disabled: false,
    to: '#',
  },
  {
    text: 'Form Basic',
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
      <CardGeneralForm></CardGeneralForm>
      <CardDefaultForm></CardDefaultForm>
      <CardSampleForm></CardSampleForm>
      <CardDefaultBasicForm></CardDefaultBasicForm>
      <CardInputGroupForm></CardInputGroupForm>
      <CardInputStateForm></CardInputStateForm>
      <CardDisabledForm></CardDisabledForm>
      <CardSimpleForm></CardSimpleForm>
    </v-col>
    <v-col cols="12" sm="6">
      <CardSampleFormwithIcons></CardSampleFormwithIcons>
    </v-col>
    <v-col cols="12" sm="6">
      <CardSampleFormwithRightIcons></CardSampleFormwithRightIcons>
    </v-col>
  </v-row>
</template>
