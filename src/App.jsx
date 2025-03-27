import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Button, Container, Paper, Toolbar, AppBar } from '@mui/material'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import BlogsPage from './components/BlogsPage'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'

import LogoutBtn from './components/LogoutBtn'
import Notification from './components/Notification'

const App = () => {
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
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
		<Container>
			<AppBar position='static'>
				<Toolbar>
					<Button color='inherit' component={Link} to='/'>
						Blogs
					</Button>

					{user.logged ? (
						<>
							<Button
								color='inherit'
								style={padding}
								component={Link}
								to='/users'
							>
								Users
							</Button>
							<span>
								{user.name} logged in <LogoutBtn />
							</span>
						</>
					) : (
						<Button
							color='inherit'
							style={padding}
							component={Link}
							to='/login'
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Notification />
			<h1>Blog List App</h1>
			<Paper elevation={3} sx={{ p: 1 }}>
				<Routes>
					<Route path='/' element={<BlogsPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/users' element={<UsersPage />} />
					<Route path='/users/:id' element={<UserPage />} />
					<Route path='/blogs/:id' element={<BlogPage blog={blog} />} />
				</Routes>
			</Paper>
		</Container>
	)
}

export default App
