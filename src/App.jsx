import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'

import BlogsPage from './components/BlogsPage'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'

import Notification from './components/Notification'

import Header from './components/Header'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

	return (
		<>
			<Header />
			<Notification />
			<Router>
				<Routes>
					<Route path='/' element={user.logged ? <BlogsPage /> : <LoginPage />} />
					<Route path='/users' element={<UsersPage />} />
					<Route path='/users/:id' element={<UserPage />} />
				</Routes>
			</Router>
		</>
	)

	// if (!user.logged) {
	// 	return (
	// 		<>
	// 			<LoginPage />
	// 		</>
	// 	)
	// }
	// return (
	// 	<div>
	// 		<BlogsPage />
	// 		{/* <Header text={'Blogs'} />
	// 		<Notification />
	// 		{user.name} logged in <button onClick={handleLogout}>Logout</button>
	// 		<br />
	// 		<BlogForm />
	// 		<Blogs /> */}
	// 	</div>
	// )
}

export default App
