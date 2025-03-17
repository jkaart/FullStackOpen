import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  visible: false,
  timeout: 5,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
      state.visible = true
    },
    clearMessage(state, action) {
      state.message = ''
      state.visible = false
    }
  }
})

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout * 1000)
  }
}

export const { setMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer