import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const dispatch = useDispatch()

	const blogFormRef = useRef()

	const handleLogin = async loginObject => {
		try {
			const user = await loginService.login(loginObject)
			window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			dispatch(setNotification(`User '${user.username}' logged in successfully`, 'info'))
		} catch (error) {
			dispatch(setNotification(`${error.response.data.error}`, 'error'))
			console.log(error.response.data.error)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogsUser')
		dispatch(setNotification(`User '${user.username}' logged out successfully`, 'info'))
		setUser(null)
	}

	const addBlog = async blogObject => {
		try {
			blogFormRef.current.toggleVisibility()
			const createdBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(createdBlog))
			dispatch(setNotification(`a new blog '${createdBlog.title}' added`, 'info'))
		} catch (error) {
			if (error.response.status === 400) {
				dispatch(setNotification('title and/or url missing', 'error'))
			}
			console.log('error', error)
		}
	}

	const editBlog = async blogObject => {
		const editedBlog = await blogService.edit(blogObject)
		const user = blogs.filter(blog => blog.id === editedBlog.id)[0].user
		const filteredBlogs = blogs.filter(blog => blog.id !== editedBlog.id)
		const editedBlogs = filteredBlogs.concat({ ...editedBlog, user })
		const sortedBlogs = editedBlogs.sort((a, b) => b.likes - a.likes)
		setBlogs(sortedBlogs)
	}

	const removeBlog = async blog => {
		try {
			const id = blog.id
			const confirm = window.confirm(
				`Remove blog ${blog.title} by ${blog.author}`,
			)
			if (confirm) {
				await blogService.remove(id)
				setBlogs(blogs.filter(blog => blog.id !== id))
				dispatch(setNotification(`Blog ${blog.title} by ${blog.author} removed successfully`, 'info'))
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		blogService
			.getAll()
			.then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	if (user === null) {
		return (
			<div>
				<Header text={'Log in to application'} />
				<Notification />
				<LoginForm login={handleLogin} />
			</div>
		)
	}
	return (
		<div>
			<Header text={'Blogs'} />
			<Notification />
			{user.name} logged in <button onClick={handleLogout}>Logout</button>
			<br />
			<Togglable buttonLabel='create new blog' ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					username={user.username}
					editBlog={editBlog}
					removeBlog={removeBlog}
				/>
			))}
		</div>
	)
}

export default App
