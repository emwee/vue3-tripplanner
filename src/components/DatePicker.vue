<script setup lang="ts">
import DateButton from './DateButton.vue'
import { shouldDisplaySeparator } from '@/helpers'

const props = defineProps<{
  dates: string[]
  selectedDate: string
  disabled?: boolean
  onChange: (date: string) => void
}>()

const handleChange = (date: string) => {
  props.onChange(date)
}
</script>

<template>
  <fieldset class="overflow-visible min-w-0 w-full disabled:opacity-20" :disabled="disabled">
    <legend class="block mb-2 text-xs tracking-wider uppercase">Date</legend>
    <div
      class="flex gap-2 overflow-x-auto overflow-y-hidden disabled:opacity-20"
      style="-webkit-overflow-scrolling: touch; scrollbar-width: thin"
    >
      <template v-for="(date, index) in dates" :key="date">
        <DateButton
          class="w-full flex-1"
          :date="date"
          :selected="selectedDate === date"
          :onChange="handleChange"
        />
        <div
          role="separator"
          class="inline-block my-3 w-[1px] self-stretch shrink-0 bg-black"
          v-if="shouldDisplaySeparator(dates, index)"
        ></div>
      </template>
    </div>
  </fieldset>
</template>
