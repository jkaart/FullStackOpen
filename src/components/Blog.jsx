import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import RemoveBlogBtn from './RemoveBlogBtn'
import { editBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const removeBlog = async blog => {
		try {
			const confirm = window.confirm(
				`Remove blog ${blog.title} by ${blog.author}`
			)
			if (confirm) {
				dispatch(deleteBlog(blog))
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

	const showMoreInfo = () => {
		setVisible(visible ? false : true)
	}

	if (!visible) {
		return (
			<div style={blogStyle} className='blog'>
				{blog.title} {blog.author}
				<button onClick={showMoreInfo} data-testid='view'>
					view
				</button>
			</div>
		)
	}
	return (
		<div style={blogStyle} className='blog'>
			<span>
				{blog.title} {blog.author}
			</span>
			<button onClick={showMoreInfo}>hide</button>
			<br />
			<span>{blog.url}</span>
			<br />
			<span>likes {blog.likes}</span>
			<button data-testid='like' onClick={() => dispatch(editBlog(blog))}>
				like
			</button>
			<br />
			<span>{blog.user.name}</span>
			<br />
			<RemoveBlogBtn
				blogUser={blog.user.username}
				onClick={() => removeBlog(blog)}
			/>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired
}

export default Blog
