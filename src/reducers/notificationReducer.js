import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	message: '',
	type: 'info',
	timeout: 5000
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setMessage(state, action) {
			state.message = action.payload
		},
		setType(state, action) {
			state.type = action.payload
		},
		clearMessage(state, action) {
			state.message = initialState.message
		}
	}
})

export const setNotification = (message, type) => {
	return async dispatch => {
		dispatch(setMessage(message))
		dispatch(setType(type))
		setTimeout(() => {
			dispatch(clearMessage())
		}, initialState.timeout)
	}
}

export const { setMessage, setType, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer
