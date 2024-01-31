import { configureStore } from "@reduxjs/toolkit"
// import Option, { optionData } from "../types"
import userReducer from "./UserSlice"
import { Visa } from "../Types"
import filterReducer from "./MainFilters"
import cartReducer from "./CartSlice"
import moderAppReducer from "./AdminOrderFilters"
import { Option } from "../Types"
import { Dates } from "../Types"

export interface RootState {
  user: {
    user_id: BigInteger
    user_email: string
    user_name: string
    is_authenticated: boolean
    is_moderator: boolean
    current_cart: number
    // l:number
  }
  filter: {
    input_value: string
  }
  cart: {
    visas: Visa[]
    id: number[]
  }
  moderApp: {
    input_value: string
    dropdown_value: Option
    date_value: Dates
  }
}

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    moderApp: moderAppReducer,
  },
})

export default store

// Экспортируйте тип RootState
// export type RootState = ReturnType<typeof store.getState>;
