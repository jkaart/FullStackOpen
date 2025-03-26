import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
		sortBlogs(state, action) {
			return state.sort((a, b) => b.likes - a.likes)
		},
		replaceBlog(state, action) {
			const id = action.payload.id
			return state.map(blog => (blog.id === id ? action.payload : blog))
		},
		removeBlog(state, action) {
			const id = action.payload.id
			return state.filter(blog => blog.id !== id)
		}
	}
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
		dispatch(sortBlogs())
	}
}

export const createBlog = content => {
	return async dispatch => {
		const newBlog = await blogService.create(content)
		dispatch(appendBlog(newBlog))
	}
}

export const editBlog = blog => {
	return async dispatch => {
		const likedBlog = { ...blog, likes: blog.likes + 1 }
		const editedBlog = await blogService.edit(likedBlog)
		dispatch(replaceBlog({ ...editedBlog, user: blog.user }))
		dispatch(sortBlogs())
	}
}

export const deleteBlog = blog => {
	return async dispatch => {
		await blogService.remove(blog.id)
		dispatch(removeBlog(blog))
	}
}

export const commentBlog = commentObject => {
	return async dispatch => {
		console.log('commentObject', commentObject)
		const commentedBlog = await blogService.comment(commentObject)
		dispatch(replaceBlog(commentedBlog))
	}
}

export const { appendBlog, setBlogs, sortBlogs, replaceBlog, removeBlog } =
	blogSlice.actions
export default blogSlice.reducer
