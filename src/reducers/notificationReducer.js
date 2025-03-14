import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  visible: false,
  timeout: 5000,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.visible = true
      state.message = action.payload
    },
    hideNotification(state) {
      state = initialState
      return state
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer