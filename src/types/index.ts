export interface City {
  cityId: number
  cityName: string
}

export interface CityByCountry {
  [countryName: string]: City[]
}

export interface ResponseCityByCountry {
  [countryName: string]: [number, string][]
}

export interface Product {
  id: number
  title: string
  summary: string
  price: number
  image: string
  discount_percentage?: number
  product_url: string
  available_dates: string[]
  city_id: number
}
