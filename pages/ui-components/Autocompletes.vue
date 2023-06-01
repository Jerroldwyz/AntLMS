<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" sm="12" lg="12">
        <BaseCard heading="Autocompletes - Dense">
          <AutocompletesDence></AutocompletesDence>
        </BaseCard>

        <BaseCard heading="Autocompletes - State selector">
          <AutocompletesStateSelector></AutocompletesStateSelector>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import AutocompletesDence from '@/components/vuetifyComponents/autocompletes/AutocompletesDence'
import AutocompletesStateSelector from '@/components/vuetifyComponents/autocompletes/AutocompletesStateSelector'
</script>
