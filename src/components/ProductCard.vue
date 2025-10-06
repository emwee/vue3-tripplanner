<script setup lang="ts">
import { formatCurrency } from '@/helpers'
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()

function formatImage(imgUrl: string, width: number) {
  return `${imgUrl}&${new URLSearchParams({ w: width.toString() }).toString()}`
}

function getPrediscountPrice(price: number, discountPercentage: number) {
  return price / (1 - discountPercentage / 100)
}
</script>

<template>
  <div
    data-component="ProductCard"
    class="flex flex-col rounded-lg overflow-hidden border border-gray-300"
  >
    <a
      :href="product.product_url"
      rel="noreferrer noopener"
      target="_blank"
      aria-label="View product"
    >
      <picture class="aspect-3/2">
        <source media="(width < 800px)" :srcset="formatImage(product.image, 345)" />
        <source media="(width >= 800px)" :srcset="formatImage(product.image, 345)" />
        <img
          :src="formatImage(product.image, 345)"
          :alt="product.title"
          loading="lazy"
          class="object-cover aspect-3/2 w-full"
        />
      </picture>
      <div class="flex flex-1 flex-col p-4">
        <div class="flex-1">
          <h3 class="font-medium text-lg/6 mb-2">{{ product.title }}</h3>
          <p class="text-xs line-clamp-2 mb-4">{{ product.summary }}</p>
        </div>
        <p class="font-semibold text-lg">
          {{ formatCurrency(product.price) }}&nbsp;<span
            v-if="product.discount_percentage"
            class="text-sm line-through text-red-700"
          >
            {{ formatCurrency(getPrediscountPrice(product.price, product.discount_percentage)) }}
          </span>
        </p>
      </div>
    </a>
  </div>
</template>
