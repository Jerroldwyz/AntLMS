<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'
import BaseCard from '@/components/baseComponents/BaseCard.vue'

import TableDarktheme from '@/components/tables/TableDarktheme.vue'
import TableDencity from '@/components/tables/TableDencity.vue'
import TableFixHeight from '@/components/tables/TableFixHeight.vue'
import TableFixHeader from '@/components/tables/TableFixHeader.vue'

const page = ref({ title: 'Tables' })
const breadcrumbs = ref([
  {
    text: 'Table',
    disabled: false,
    to: '#',
  },
  {
    text: 'Tables',
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
    <v-col cols="12" sm="12">
      <BaseCard heading="Dark Theme">
        <TableDarktheme />
      </BaseCard>
    </v-col>
    <v-col cols="12" sm="12">
      <BaseCard heading="Dencity">
        <TableDencity />
      </BaseCard>
    </v-col>
    <v-col cols="12" sm="12">
      <BaseCard heading="Height">
        <TableFixHeight />
      </BaseCard>
    </v-col>
    <v-col cols="12" sm="12">
      <BaseCard heading="Fixed Header">
        <TableFixHeader />
      </BaseCard>
    </v-col>
  </v-row>
</template>
