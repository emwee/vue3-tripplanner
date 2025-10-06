<script setup lang="ts">
import SelectBox from './SelectBox.vue'
import type { City } from '@/types'

defineProps<{
  cities: City[]
  selectedCityId: string
  disabled?: boolean
  onChange: (cityId: string) => void
}>()
</script>
<template>
  <SelectBox
    label="City"
    defaultOption="Choose the city"
    :options="cities.map((city) => ({ id: city.cityId.toString(), text: city.cityName }))"
    :selectedOption="selectedCityId"
    :onChange="onChange"
    :disabled="disabled"
  />
</template>
