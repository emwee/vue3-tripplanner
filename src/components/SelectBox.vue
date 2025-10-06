<script setup lang="ts">
import { getUniqeId } from '@/helpers'
import { ref } from 'vue'

const props = defineProps<{
  label?: string
  disabled?: boolean
  options: { id: string; text: string }[]
  defaultOption: string
  selectedOption?: string
  selectedCountry?: string
  onChange: (option: string) => void
}>()

const selectId = ref(`select-${getUniqeId()}`)

const handleChange = (event: Event) => {
  props.onChange((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <fieldset :disabled="disabled" class="disabled:opacity-20">
    <label v-if="label" class="block mb-2 text-xs tracking-wider uppercase" :for="selectId">{{
      label
    }}</label>
    <select
      :id="selectId"
      class="block w-full px-1 py-4 text-gray-900 text-base/6 font-bold border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      @change="handleChange"
    >
      <option value="">{{ defaultOption }}</option>
      <option
        v-for="option in options"
        :key="option.id"
        :selected="selectedOption == option.id"
        :value="option.id"
      >
        {{ option.text }}
      </option>
    </select>
  </fieldset>
</template>

<style scoped></style>
