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
import { AxiosResponse } from "axios"

export type Response = Promise<AxiosResponse> | any
