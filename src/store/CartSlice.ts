import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Visa } from "../Types"

interface cartData {
  visas: Visa[]
  id: number[]
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    visas: [],
    id: [],
  } as cartData,
  reducers: {
    setCart: (state, action: PayloadAction<Visa[]>) => {
      state.visas = action.payload
    },
    setCartIds: (state, action: PayloadAction<number[]>) => {
      state.id = action.payload
    },
    addItem: (state, action: PayloadAction<Visa>) => {
      state.visas.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.visas = state.visas.filter((obj) => obj.id !== action.payload)
    },
  },
})

export const { setCart, setCartIds, addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
