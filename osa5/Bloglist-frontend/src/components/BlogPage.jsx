import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import RemoveBlogBtn from './RemoveBlogBtn'
import Comments from './Comments'
import Heading from './Heading'
import { Box, Button, Grid, Stack } from '@mui/material'
import LikeIcon from '@mui/icons-material/ThumbUp'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const removeBlog = async blog => {
		try {
			const confirm = window.confirm(
				`Remove blog ${blog.title} by ${blog.author}`
			)
			if (confirm) {
				dispatch(deleteBlog(blog))
				navigate('/')
				dispatch(
					setNotification(
						`Blog ${blog.title} by ${blog.author} removed successfully`,
						'info'
					)
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (!blog) {
		return null
	}
	return (
		<div className='blog'>
			<Heading text={`${blog.title} ${blog.author}`} />
			<div>
				<a href={blog.url}>{blog.url}</a>
			</div>
			<div>likes {blog.likes}</div>
			<div>added by {blog.user.name}</div>
			<Button
				sx={{ marginRight: 1, marginTop: 1 }}
				variant='contained'
				data-testid='like'
				startIcon={<LikeIcon />}
				onClick={() => dispatch(editBlog(blog))}
			>
				like
			</Button>
			<RemoveBlogBtn
				blogUser={blog.user.username}
				onClick={() => removeBlog(blog)}
			/>
			<Comments blog={blog} />
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object
}

export default Blog
