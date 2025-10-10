import { API_URLs } from '@/constants'
import type { Product, ResponseCityByCountry } from '@/types'

export async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Fetch error ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export async function getAvailableDates(): Promise<string[]> {
  return await fetchJson<string[]>(API_URLs.DATES)
}

export async function getLocations(): Promise<ResponseCityByCountry> {
  return await fetchJson<ResponseCityByCountry>(API_URLs.LOCATIONS)
}

export async function getProducts(): Promise<Product[]> {
  return await fetchJson<Product[]>(API_URLs.PRODUCTS)
}
