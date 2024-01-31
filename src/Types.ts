import { AxiosResponse } from "axios"

export interface Visa {
  id: number
  name: string
  description: string
  status: number
  image: string

  country: string
  price: number
  duration: number
}
interface Customer {
  email: string
}
export interface Order {
  id: number
  status: number
  date_created: string
  date_of_formation: string
  date_complete: string
  user: Customer
  moderator: number
  visas: number[]
}
export interface Option {
  id: number
  name: string
}
export interface Dates {
  start_date: string
  end_date: string
}
export type Response = Promise<AxiosResponse> | any
