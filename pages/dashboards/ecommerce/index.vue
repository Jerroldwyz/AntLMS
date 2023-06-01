<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'

import EarningsDownload from '@/components/dashboardComponents/ecommerce/earnings-download/EarningsDownload.vue'
import TopCards from '@/components/dashboardComponents/ecommerce/top-cards/TopCards.vue'
import ProductsChart from '@/components/dashboardComponents/ecommerce/products-chart/ProductsChart.vue'
import Earnings from '@/components/dashboardComponents/ecommerce/earnings/Earnings.vue'
import YearlySales from '@/components/dashboardComponents/ecommerce/yearly-sales/YearlySales.vue'
import RecentTransactions from '@/components/dashboardComponents/ecommerce/recent-transactions/RecentTransactions.vue'
import ProductPerformance from '@/components/dashboardComponents/ecommerce/product-performance/ProductPerformance.vue'
import WeeklyStats from '@/components/dashboardComponents/analytical/weekly-stats/WeeklyStats.vue'
import MedicalProBranding from '@/components/dashboardComponents/ecommerce/medicalpro-branding/MedicalProBranding.vue'
import DailyActivites from '@/components/dashboardComponents/ecommerce/daily-activities/DailyActivites.vue'

const page = ref({ title: 'Ecommerce' })
const breadcrumbs = ref([
  {
    text: 'Dashboard',
    disabled: false,
    href: '#',
  },
  {
    text: 'Ecommerce',
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
    <v-col cols="12" lg="4">
      <EarningsDownload />
    </v-col>
    <v-col cols="12" lg="8">
      <TopCards />
    </v-col>
    <v-col cols="12" lg="8">
      <ProductsChart />
    </v-col>
    <v-col cols="12" lg="4">
      <Earnings />
      <YearlySales />
    </v-col>
    <v-col cols="12" lg="4" class="d-flex align-items-stretch">
      <RecentTransactions />
    </v-col>
    <v-col cols="12" lg="8" class="d-flex align-items-stretch">
      <ProductPerformance />
    </v-col>
    <v-col cols="12" lg="4">
      <WeeklyStats />
    </v-col>
    <v-col cols="12" lg="4">
      <MedicalProBranding />
    </v-col>
    <v-col cols="12" lg="4">
      <DailyActivites />
    </v-col>
  </v-row>
</template>
