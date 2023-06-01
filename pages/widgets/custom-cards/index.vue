<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'
import BackgroundCard from '@/components/widgets/BackgroundCard.vue'
import SampleCard from '@/components/widgets/SampleCard.vue'
import ButtonsCards from '@/components/widgets/ButtonsCards.vue'
import ImageCards from '@/components/widgets/ImageCards.vue'

const page = ref({ title: 'Custom Cards' })
const breadcrumbs = ref([
  {
    text: 'Widgets',
    disabled: false,
    to: '#',
  },
  {
    text: 'Custom Cards',
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
      <BackgroundCard />
    </v-col>
    <v-col cols="12">
      <SampleCard />
    </v-col>
    <v-col cols="12">
      <ButtonsCards />
    </v-col>
    <v-col cols="12">
      <ImageCards />
    </v-col>
  </v-row>
</template>
