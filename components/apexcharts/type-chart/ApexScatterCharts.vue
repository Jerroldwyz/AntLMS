<script setup lang="ts">
import { scatterChart } from '../ApexChartsData'
import BaseCard from '@/components/baseComponents/BaseCard.vue'
</script>
<template>
  <BaseCard heading="Column Chart">
    <apexchart
      type="scatter"
      height="350"
      :options="scatterChart.chartOptions"
      :series="scatterChart.series"
    ></apexchart>
  </BaseCard>
</template>
