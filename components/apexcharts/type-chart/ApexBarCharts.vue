<script setup lang="ts">
import { barChart } from '../ApexChartsData'
import BaseCard from '@/components/baseComponents/BaseCard.vue'
</script>
<template>
  <BaseCard heading="Bar Chart">
    <apexchart
      type="bar"
      height="350"
      :options="barChart.chartOptions"
      :series="barChart.series"
    ></apexchart>
  </BaseCard>
</template>
