<script setup lang="ts">
import { formatWeekday, formatDay } from '../helpers'

defineProps<{
  date: string
  selected: boolean
  onChange: (date: string) => void
}>()

const getButtonClasses = (selected: boolean) => {
  const defaultClasses = `
    px-4 py-3
    rounded-lg
    text-sm
    border border-black
  `

  return `${defaultClasses} ${selected ? 'text-white bg-purple-800' : ''}`
}
</script>

<template>
  <button @click="onChange(date)" :class="getButtonClasses(selected)">
    <span class="block text-xs uppercase mb-2">{{ formatWeekday(date) }}</span>
    <span class="text-2xl/4"
      ><time :datetime="date">{{ formatDay(date) }}</time></span
    >
  </button>
</template>
