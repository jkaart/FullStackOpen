import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../services/blogs'

const initialState = {
	username: null,
	name: null,
	token: null,
	logged: false
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser(state, action) {
			blogService.setToken(action.payload.token)
			return { ...action.payload, logged: true }
		},
		clearUser(state, action) {
			return initialState
		},
		isUserLogged(state, action) {
			return state.logged
		},
		getToken(state, action) {
			return state.token
		}
	}
})

export const logIn = ({ username, password }) => {
	return async dispatch => {
		try {
			const user = await userService.login({ username, password })
			window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
			dispatch(setUser(user))
			dispatch(
				setNotification(`User '${username}' logged in successfully`, 'info')
			)
		} catch (error) {
			dispatch(setNotification(`${error.response.data.error}`, 'error'))
		}
	}
}

export const logOut = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBlogsUser')
		dispatch(clearUser())
	}
}

export const { setUser, clearUser, isUserLogged } = userSlice.actions
export default userSlice.reducer
