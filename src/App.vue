<script setup lang="ts">
import CountryPicker from '@/components/CountryPicker.vue'
import CityPicker from '@/components/CityPicker.vue'
import DatePicker from '@/components/DatePicker.vue'
import ProductList from '@/components/ProductList.vue'
import { ref, watchEffect } from 'vue'
import type { City, CityByCountry, Product, ResponseCityByCountry } from '@/types'
import { API_URLs, PREFILL_DATA } from '@/constants'

const availableDates = ref<string[]>([])
const countries = ref<string[]>([])
const citiesByCountry = ref<CityByCountry>({})
const cities = ref<City[]>([])

const selectedCountry = ref('')
const selectedCityId = ref('')
const selectedDate = ref('')

const productResults = ref<Product[]>([])

const cachedProducts = new Map<string, Product[]>()

function cacheKey(cityId: string, date: string) {
  return `${cityId}-${date}`
}

watchEffect(async () => {
  availableDates.value = await (await fetch(API_URLs.DATES)).json()

  const response: ResponseCityByCountry = await (await fetch(API_URLs.LOCATIONS)).json()
  const countryNames = Object.keys(response)

  countries.value = countryNames
  citiesByCountry.value = countryNames.reduce((byCountryName, countryName) => {
    return {
      ...byCountryName,
      [countryName]: response[countryName].map(([cityId, cityName]) => ({
        cityId,
        cityName,
      })),
    }
  }, {})
})

watchEffect(async () => {
  if (!selectedCityId.value || !selectedDate.value) {
    productResults.value = []
    return
  }

  if (cachedProducts.has(`${selectedCityId.value}-${selectedDate.value}`)) {
    productResults.value =
      cachedProducts.get(cacheKey(selectedCityId.value, selectedDate.value)) ?? []
    return
  }

  const result = await (
    await fetch(
      `${API_URLs.PRODUCTS}?${new URLSearchParams({
        date: selectedDate.value,
        city_id: selectedCityId.value,
      }).toString()}`,
    )
  ).json()

  productResults.value = result
  cachedProducts.set(cacheKey(selectedCityId.value, selectedDate.value), result)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prefillData() {
  selectedCountry.value = PREFILL_DATA.COUNTRY_NAME
  selectedCityId.value = PREFILL_DATA.CITY_ID
  selectedDate.value = PREFILL_DATA.DATE
  cities.value = citiesByCountry.value[selectedCountry.value]
}

function handleSelectCountry(country: string) {
  console.log('handleSelectCountry', country)
  selectedCountry.value = country
  selectedCityId.value = ''
  selectedDate.value = ''
  cities.value = selectedCountry.value ? citiesByCountry.value[selectedCountry.value] : []
}
function handleSelectCity(cityId: string) {
  selectedCityId.value = cityId
  selectedDate.value = ''
}
function handleSelectDate(date: string) {
  selectedDate.value = date
}
</script>
<template>
  <header class="flex items-center justify-center m-auto h-[168px] bg-purple-900">
    <h1 class="text-white text-3xl align-middle">Plan your trip</h1>
  </header>
  <div class="flex flex-col">
    <section class="container px-4 py-6 max-w-3xl mx-auto">
      <fieldset class="md:flex gap-4">
        <CountryPicker
          class="md:flex-1 mb-4"
          :countries="countries"
          :selectedCountry="selectedCountry"
          :onChange="handleSelectCountry"
        />
        <CityPicker
          class="md:flex-1 mb-4"
          :cities="cities"
          :disabled="!selectedCountry"
          :selectedCityId="selectedCityId"
          :onChange="handleSelectCity"
        />
      </fieldset>
      <DatePicker
        :dates="availableDates"
        :disabled="!selectedCityId"
        :selectedDate="selectedDate"
        :onChange="handleSelectDate"
      />
    </section>
    <hr class="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700" />
    <main class="container px-4 py-6 max-w-3xl mx-auto">
      <ProductList :products="productResults" />
      <div v-if="productResults.length === 0" class="mt-6">
        <p class="text-center text-gray-500">Select filters first.</p>
      </div>
    </main>
  </div>
</template>
