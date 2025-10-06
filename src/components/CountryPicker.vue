<script setup lang="ts">
import SelectBox from './SelectBox.vue'

defineProps<{
  countries: string[]
  selectedCountry: string
  onChange: (country: string) => void
}>()
</script>

<template>
  <SelectBox
    label="Country"
    defaultOption="Choose the country"
    :options="countries.map((country) => ({ id: country, text: country }))"
    :selectedOption="selectedCountry"
    :onChange="onChange"
  />
</template>
