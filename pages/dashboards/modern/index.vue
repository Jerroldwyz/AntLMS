<script setup lang="ts">
import { ref } from 'vue'

import BaseBreadcrumb from '@/components/baseComponents/BaseBreadcrumb.vue'

import CongratulationCard from '@/components/dashboardComponents/modern/congratulation-card/CongratulationCard.vue'
import Purchases from '@/components/dashboardComponents/modern/purchases/Purchases.vue'
import TotalEarnings from '@/components/dashboardComponents/modern/total-earnings/TotalEarnings.vue'
import RevenueUpdates from '@/components/dashboardComponents/modern/revenue-updates/RevenueUpdates.vue'
import MonthlyEarnings from '@/components/dashboardComponents/modern/monthly-earnings/MonthlyEarnings.vue'
import Customers from '@/components/dashboardComponents/modern/customers/Customers.vue'
import TotalSales from '@/components/dashboardComponents/analytical/total-sales/TotalSales.vue'
import ProductPerformance from '@/components/dashboardComponents/modern/product-performance/ProductPerformance.vue'
import TheSalesOverview from '@/components/dashboardComponents/analytical/sales-overview/TheSalesOverview.vue'
import BlogCard from '@/components/dashboardComponents/analytical/blog-card/BlogCard.vue'
import WeeklyStats from '@/components/dashboardComponents/analytical/weekly-stats/WeeklyStats.vue'
import MedicalProBranding from '@/components/dashboardComponents/ecommerce/medicalpro-branding/MedicalProBranding.vue'
import DailyActivities from '@/components/dashboardComponents/analytical/daily-activities/DailyActivities.vue'

const page = ref({ title: 'Modern' })
const breadcrumbs = ref([
  {
    text: 'Dashboard',
    disabled: false,
    href: '#',
  },
  {
    text: 'Modern',
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
    <v-col cols="12" sm="12" lg="5">
      <CongratulationCard />
    </v-col>
    <v-col cols="12" sm="12" lg="7">
      <v-row>
        <v-col lg="5">
          <Purchases />
        </v-col>
        <v-col lg="7">
          <TotalEarnings />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="12" lg="8">
      <RevenueUpdates />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <MonthlyEarnings />
      <Customers />
    </v-col>
    <v-col cols="12" sm="12" lg="4">
      <TotalSales />
    </v-col>
    <v-col cols="12" sm="12" lg="8">
      <ProductPerformance />
    </v-col>
    <v-col cols="12" sm="12" lg="5">
      <DailyActivities />
    </v-col>
    <v-col cols="12" sm="12" lg="7" class="d-flex align-stretch">
      <TheSalesOverview />
    </v-col>
    <v-col cols="12" lg="4">
      <BlogCard />
    </v-col>
    <v-col cols="12" lg="4">
      <WeeklyStats />
    </v-col>
    <v-col cols="12" lg="4">
      <MedicalProBranding />
    </v-col>
  </v-row>
</template>
