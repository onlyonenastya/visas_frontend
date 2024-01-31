import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  input_value: "",
}

const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setInputValue(state, action) {
      state.input_value = action.payload
    },
    resetMainFilters(state) {
      return initialState
    },
  },
})

export const { setInputValue, resetMainFilters } = filterSlice.actions
export default filterSlice.reducer
