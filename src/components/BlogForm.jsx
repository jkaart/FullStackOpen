import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Grid, TextField } from '@mui/material'

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
		<>
			<Grid container direction={'column'}>
				<Togglable buttonLabel='create new blog' ref={blogFormRef}>
					<Grid>
						<h3>create new</h3>
					</Grid>
					<form onSubmit={addBlog}>
						<Grid sx={{ py: 1 }}>
							<TextField
								label='title'
								value={newTitle}
								placeholder='write blog title'
								onChange={handleNewTitle}
								size='small'
							/>
						</Grid>
						<Grid sx={{ py: 1 }}>
							<TextField
								label='author'
								value={newAuthor}
								placeholder='write blog author'
								onChange={handleNewAuthor}
								size='small'
							/>
						</Grid>
						<Grid sx={{ py: 1 }}>
							<TextField
								label='url'
								placeholder='write blog url'
								value={newUrl}
								onChange={handleNewUrl}
								size='small'
							/>
						</Grid>
						<Grid sx={{ py: 1 }}>
							<Button variant='contained' type='submit'>
								create
							</Button>
						</Grid>
					</form>
				</Togglable>
			</Grid>
		</>
	)
}

export default BlogForm
