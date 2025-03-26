import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import LogoutBtn from './components/LogoutBtn'

import BlogsPage from './components/BlogsPage'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'

import Notification from './components/Notification'

import Header from './components/Header'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const dispatch = useDispatch()

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

	const match = useMatch('/blogs/:id')
	const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

	const padding = {
		padding: 5
	}

	return (
		<div>
			<Header />
			<Notification />
			<div>
				{user.logged ? (
					<>
						<Link style={padding} to='/'>
							Blogs
						</Link>
						<Link style={padding} to='/users'>
							Users
						</Link>
						<span>
							{user.name} logged in <LogoutBtn />
						</span>
					</>
				) : null}
			</div>
			<Routes>
				<Route path='/' element={user.logged ? <BlogsPage /> : <LoginPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/users/:id' element={<UserPage />} />
				<Route path='/blogs/:id' element={<BlogPage blog={blog} />} />
			</Routes>
		</div>
	)
}

export default App
