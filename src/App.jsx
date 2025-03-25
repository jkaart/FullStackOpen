import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logOut, setUser } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logOut())
		dispatch(
			setNotification(`User '${user.username}' logged out successfully`, 'info')
		)
	}

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}, [])

	if (!user.logged) {
		return (
			<div>
				<Header text={'Log in to application'} />
				<Notification />
				<LoginForm />
			</div>
		)
	}
	return (
		<div>
			<Header text={'Blogs'} />
			<Notification />
			{user.name} logged in <button onClick={handleLogout}>Logout</button>
			<br />
			<BlogForm />
			<Blogs />
		</div>
	)
}

export default App
