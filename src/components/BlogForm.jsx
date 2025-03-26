import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
	const token = useSelector(state => state.user.token)
	const dispatch = useDispatch()

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const handleNewTitle = event => setNewTitle(event.target.value)
	const handleNewAuthor = event => setNewAuthor(event.target.value)
	const handleNewUrl = event => setNewUrl(event.target.value)
	const blogFormRef = useRef()

	const addBlog = async event => {
		try {
			event.preventDefault()
			blogFormRef.current.toggleVisibility()
			const blogObject = {
				title: newTitle,
				author: newAuthor,
				url: newUrl,
				likes: 0
			}
			blogService.setToken(token)
			dispatch(createBlog(blogObject))
			dispatch(
				setNotification(`a new blog '${blogObject.title}' added`, 'info')
			)
			setNewTitle('')
			setNewAuthor('')
			setNewUrl('')
		} catch (error) {
			console.log('error', error)
			if (error.response.status === 400) {
				dispatch(setNotification('title and/or url missing', 'error'))
			}
		}
	}
	return (
		<Togglable buttonLabel='create new blog' ref={blogFormRef}>
			<h2>create new</h2>
			<form onSubmit={addBlog}>
				title
				<input
					value={newTitle}
					placeholder='write blog title'
					onChange={handleNewTitle}
				/>
				<br />
				author
				<input
					value={newAuthor}
					placeholder='write blog author'
					onChange={handleNewAuthor}
				/>
				<br />
				url
				<input
					value={newUrl}
					placeholder='write blog url'
					onChange={handleNewUrl}
				/>
				<br />
				<button type='submit'>create</button>
			</form>
		</Togglable>
	)
}

export default BlogForm
