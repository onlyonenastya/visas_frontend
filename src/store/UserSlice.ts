import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user_id: -1,
  user_email: "",
  user_name: "",
  is_authenticated: false,
  is_moderator: false,
  current_cart: 0,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.is_authenticated = action.payload.is_authenticated
      state.user_name = action.payload.user_name
      state.is_moderator = action.payload.is_moderator
      state.user_id = action.payload.user_id
      state.user_email = action.payload.user_email
    },
    cleanUser: (state) => {
      state.is_authenticated = false
      state.is_moderator = false
      state.user_id = -1
      state.user_email = ""
    },
    updateCart: (state, action) => {
      state.current_cart = action.payload
    },
  },
})

export const { updateUser, cleanUser, updateCart } = userSlice.actions

export default userSlice.reducer
