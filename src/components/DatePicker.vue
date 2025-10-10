<script setup lang="ts">
import { useTemplateRef } from 'vue'
import DateButton from './DateButton.vue'
import { shouldDisplaySeparator } from '@/helpers'

const props = defineProps<{
  dates: string[]
  selectedDate: string
  disabled?: boolean
  onChange: (date: string) => void
}>()

const dateButtonsContainerRef = useTemplateRef('date-buttons-container-ref')

const handleChange = (date: string) => {
  props.onChange(date)
}

defineExpose({
  dateButtonsContainerRef,
})
</script>

<template>
  <fieldset class="overflow-visible min-w-0 w-full disabled:opacity-20" :disabled="disabled">
    <legend class="block mb-2 text-xs tracking-wider uppercase">Date</legend>
    <div
      ref="date-buttons-container-ref"
      class="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-thin disabled:opacity-20"
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
