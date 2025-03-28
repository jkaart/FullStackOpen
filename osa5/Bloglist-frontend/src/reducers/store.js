import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'

const store = configureStore({
	reducer: {
		user: userReducer,
		blogs: blogReducer,
		users: usersReducer,
		notification: notificationReducer
	}
})

export default store
